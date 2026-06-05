const prisma = require("../config/prisma");

exports.submitRating = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;
    const fromUserId = req.user.id;

    if (!bookingId || !rating) return res.status(400).json({ success: false, message: "bookingId and rating required" });
    if (rating < 1 || rating > 5) return res.status(400).json({ success: false, message: "Rating must be 1-5" });

    const booking = await prisma.booking.findUnique({
      where: { id: Number(bookingId) },
      include: { rating: true },
    });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    if (booking.status !== "COMPLETED") return res.status(400).json({ success: false, message: "Can only rate completed rides" });
    if (booking.rating) return res.status(400).json({ success: false, message: "Already rated" });

    const isCustomer = booking.customerId === fromUserId;
    const isDriver   = booking.driverId   === fromUserId;
    if (!isCustomer && !isDriver) return res.status(403).json({ success: false, message: "Not authorized" });

    const toUserId = isCustomer ? booking.driverId : booking.customerId;
    const fromRole = isCustomer ? "CUSTOMER" : "DRIVER";

    const newRating = await prisma.rating.create({
      data: { bookingId: Number(bookingId), fromUserId, toUserId, fromRole, rating: Number(rating), comment: comment || null },
    });

    // Recalculate average rating for toUser
    const allRatings = await prisma.rating.findMany({ where: { toUserId } });
    const avg = allRatings.reduce((s, r) => s + r.rating, 0) / allRatings.length;
    await prisma.user.update({
      where: { id: toUserId },
      data: { averageRating: parseFloat(avg.toFixed(1)), totalRatings: allRatings.length },
    });

    return res.status(201).json({ success: true, rating: newRating });
  } catch (err) {
    console.error("SUBMIT RATING ERROR:", err);
    return res.status(500).json({ success: false, message: "Failed to submit rating" });
  }
};

exports.getDriverRatings = async (req, res) => {
  try {
    const driverId = Number(req.params.id);
    const ratings = await prisma.rating.findMany({
      where: { toUserId: driverId, fromRole: "CUSTOMER" },
      include: { fromUser: { select: { fullName: true, profilePhoto: true } } },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    const user = await prisma.user.findUnique({ where: { id: driverId }, select: { averageRating: true, totalRatings: true } });
    return res.status(200).json({ success: true, ratings, ...user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to fetch ratings" });
  }
};
