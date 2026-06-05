const prisma = require("../config/prisma");

const VALID_STATUSES = ["PENDING", "ACCEPTED", "STARTED", "COMPLETED", "CANCELLED"];

// Base fares per km by vehicle type
const FARE_RATES = {
  BIKE:  { base: 20, perKm: 8,  perMin: 1 },
  AUTO:  { base: 30, perKm: 12, perMin: 1.5 },
  CAR:   { base: 50, perKm: 15, perMin: 2 },
  TRUCK: { base: 100, perKm: 25, perMin: 3 },
};

exports.calculateFare = async (req, res) => {
  const { distance, duration, rideType } = req.query;
  const dist = parseFloat(distance) || 5;
  const dur  = parseFloat(duration) || 15;
  const type = (rideType || "AUTO").toUpperCase();
  const rate = FARE_RATES[type] || FARE_RATES.AUTO;
  const fare = Math.round(rate.base + dist * rate.perKm + dur * rate.perMin);
  const surge = new Date().getHours() >= 20 || new Date().getHours() <= 6 ? 1.2 : 1;
  return res.json({ success: true, fare: Math.round(fare * surge), base: rate.base, perKm: rate.perKm, distance: dist, rideType: type });
};

exports.createBooking = async (req, res) => {
  try {
    const { pickup, destination, rideType, fare, distance, duration, promoCode, paymentMethod, scheduledAt } = req.body;

    if (!pickup || !destination || !rideType) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let discountAmount = 0;
    let promoId = null;

    if (promoCode) {
      const promo = await prisma.promoCode.findUnique({ where: { code: promoCode.toUpperCase() } });
      if (promo && promo.isActive && promo.usedCount < promo.maxUses) {
        const used = await prisma.promoUsage.findFirst({ where: { promoId: promo.id, userId: req.user.id } });
        if (!used) {
          discountAmount = promo.type === "PERCENTAGE"
            ? Math.min((Number(fare) * promo.discount) / 100, 500)
            : promo.discount;
          promoId = promo.id;
          await prisma.promoCode.update({ where: { id: promo.id }, data: { usedCount: { increment: 1 } } });
        }
      }
    }

    const baseFare   = Number(fare) || 0;
    const finalFare  = Math.max(0, baseFare - discountAmount);

    const booking = await prisma.booking.create({
      data: {
        customerId:     req.user.id,
        pickup, destination, rideType,
        fare:           baseFare,
        discountAmount, finalFare,
        distance:       distance || null,
        duration:       duration || null,
        promoCode:      promoCode?.toUpperCase() || null,
        paymentMethod:  paymentMethod || "CASH",
        scheduledAt:    scheduledAt ? new Date(scheduledAt) : null,
      },
      include: { customer: { select: { fullName: true, phone: true } } },
    });

    // Record promo usage
    if (promoId) {
      await prisma.promoUsage.create({ data: { promoId, userId: req.user.id, bookingId: booking.id } });
    }

    return res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error("CREATE BOOKING ERROR:", err);
    return res.status(500).json({ success: false, message: "Booking creation failed" });
  }
};

exports.getCustomerBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { customerId: req.user.id },
      include: {
        driver: { select: { fullName: true, phone: true, vehicleType: true, vehicleNumber: true, profilePhoto: true, averageRating: true } },
        rating: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ success: true, bookings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        customer: { select: { fullName: true, phone: true, profilePhoto: true } },
        driver:   { select: { fullName: true, phone: true, vehicleType: true, vehicleNumber: true, profilePhoto: true, averageRating: true } },
        rating:   true,
      },
    });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    return res.json({ success: true, booking });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch booking" });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) return res.status(400).json({ success: false, message: "Invalid status" });
    const booking = await prisma.booking.update({ where: { id: bookingId }, data: { status } });
    return res.json({ success: true, booking });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to update booking" });
  }
};

exports.getPendingBookings = async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: { status: "PENDING", scheduledAt: null },
    include: { customer: { select: { fullName: true, phone: true } } },
    orderBy: { createdAt: "desc" },
  });
  return res.json({ success: true, bookings });
};

exports.acceptBooking = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const existing = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!existing) return res.status(404).json({ success: false, message: "Booking not found" });
    if (existing.status !== "PENDING") return res.status(400).json({ success: false, message: "Booking no longer pending" });
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { driverId: req.user.id, status: "ACCEPTED" },
      include: { customer: { select: { fullName: true, phone: true } } },
    });
    return res.json({ success: true, booking });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to accept booking" });
  }
};

exports.getDriverBookings = async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: { driverId: req.user.id },
    include: { customer: { select: { fullName: true, phone: true } }, rating: true },
    orderBy: { createdAt: "desc" },
  });
  return res.json({ success: true, bookings });
};

exports.startRide = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const existing = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!existing || existing.driverId !== req.user.id) return res.status(403).json({ success: false, message: "Not authorized" });
    if (existing.status !== "ACCEPTED") return res.status(400).json({ success: false, message: "Booking must be accepted first" });
    const booking = await prisma.booking.update({ where: { id: bookingId }, data: { status: "STARTED" } });
    return res.json({ success: true, booking });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to start ride" });
  }
};

exports.completeRide = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const existing = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!existing || existing.driverId !== req.user.id) return res.status(403).json({ success: false, message: "Not authorized" });
    if (existing.status !== "STARTED") return res.status(400).json({ success: false, message: "Ride must be started first" });

    const LOYALTY_PER_RIDE = 10;
    const DRIVER_EARNINGS_PERCENT = 0.8;
    const driverEarnings = Math.round(existing.finalFare * DRIVER_EARNINGS_PERCENT) || Math.round(existing.fare * DRIVER_EARNINGS_PERCENT);

    const [booking] = await Promise.all([
      prisma.booking.update({ where: { id: bookingId }, data: { status: "COMPLETED", loyaltyEarned: LOYALTY_PER_RIDE, paymentStatus: "PAID" } }),
      // Award loyalty points to customer
      prisma.user.update({ where: { id: existing.customerId }, data: { loyaltyPoints: { increment: LOYALTY_PER_RIDE } } }),
      // Credit driver wallet + record transaction
      prisma.user.update({ where: { id: req.user.id }, data: { walletBalance: { increment: driverEarnings } } }),
      prisma.walletTransaction.create({ data: { userId: req.user.id, amount: driverEarnings, type: "CREDIT", description: `Earnings for ride #${bookingId}`, reference: `BOOKING_${bookingId}` } }),
    ]);

    return res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to complete ride" });
  }
};

exports.cancelRide = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const existing = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!existing) return res.status(404).json({ success: false, message: "Booking not found" });
    const isCustomer = existing.customerId === req.user.id;
    const isDriver   = existing.driverId   === req.user.id;
    const isAdmin    = req.user.role === "ADMIN";
    if (!isCustomer && !isDriver && !isAdmin) return res.status(403).json({ success: false, message: "Not authorized" });
    if (["COMPLETED", "CANCELLED"].includes(existing.status)) return res.status(400).json({ success: false, message: "Cannot cancel" });
    const booking = await prisma.booking.update({ where: { id: bookingId }, data: { status: "CANCELLED" } });
    return res.json({ success: true, booking });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to cancel ride" });
  }
};

// Scheduled rides
exports.createScheduled = async (req, res) => {
  try {
    const { pickup, destination, rideType, scheduledAt } = req.body;
    if (!pickup || !destination || !scheduledAt) return res.status(400).json({ success: false, message: "pickup, destination and scheduledAt required" });
    if (new Date(scheduledAt) <= new Date()) return res.status(400).json({ success: false, message: "Scheduled time must be in the future" });
    const ride = await prisma.scheduledRide.create({
      data: { customerId: req.user.id, pickup, destination, rideType: rideType || "CAR", scheduledAt: new Date(scheduledAt) },
    });
    return res.status(201).json({ success: true, ride });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to schedule ride" });
  }
};

exports.getScheduledRides = async (req, res) => {
  const rides = await prisma.scheduledRide.findMany({
    where: { customerId: req.user.id },
    orderBy: { scheduledAt: "asc" },
  });
  return res.json({ success: true, rides });
};

exports.cancelScheduled = async (req, res) => {
  const id = Number(req.params.id);
  const ride = await prisma.scheduledRide.findUnique({ where: { id } });
  if (!ride || ride.customerId !== req.user.id) return res.status(404).json({ success: false, message: "Not found" });
  await prisma.scheduledRide.update({ where: { id }, data: { status: "CANCELLED" } });
  return res.json({ success: true });
};
