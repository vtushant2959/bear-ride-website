const prisma = require("../config/prisma");

const VALID_STATUSES = ["PENDING", "ACCEPTED", "STARTED", "COMPLETED", "CANCELLED"];

exports.createBooking = async (req, res) => {
  try {
    const { pickup, destination, rideType, fare, distance, duration } = req.body;

    if (!pickup || !destination || !rideType) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: req.user.id,
        pickup,
        destination,
        rideType,
        fare: Number(fare) || 0,
        distance: distance || null,
        duration: duration || null,
      },
      include: { customer: { select: { fullName: true, phone: true } } },
    });

    return res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);
    return res.status(500).json({ success: false, message: "Booking creation failed" });
  }
};

exports.getCustomerBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { customerId: req.user.id },
      include: { driver: { select: { fullName: true, phone: true, vehicleType: true, vehicleNumber: true } } },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        customer: { select: { fullName: true, phone: true } },
        driver: { select: { fullName: true, phone: true, vehicleType: true, vehicleNumber: true } },
      },
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (
      req.user.role === "CUSTOMER" && booking.customerId !== req.user.id &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    return res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch booking" });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    return res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to update booking" });
  }
};

exports.getPendingBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { status: "PENDING" },
      include: { customer: { select: { fullName: true, phone: true } } },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("PENDING ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
};

exports.acceptBooking = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);

    const existing = await prisma.booking.findUnique({ where: { id: bookingId } });

    if (!existing) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (existing.status !== "PENDING") {
      return res.status(400).json({ success: false, message: "Booking is no longer pending" });
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { driverId: req.user.id, status: "ACCEPTED" },
      include: { customer: { select: { fullName: true, phone: true } } },
    });

    return res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error("ACCEPT ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to accept booking" });
  }
};

exports.getDriverBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { driverId: req.user.id },
      include: { customer: { select: { fullName: true, phone: true } } },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch driver bookings" });
  }
};

exports.startRide = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);

    const existing = await prisma.booking.findUnique({ where: { id: bookingId } });

    if (!existing || existing.driverId !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (existing.status !== "ACCEPTED") {
      return res.status(400).json({ success: false, message: "Booking must be accepted first" });
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "STARTED" },
    });

    return res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to start ride" });
  }
};

exports.completeRide = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);

    const existing = await prisma.booking.findUnique({ where: { id: bookingId } });

    if (!existing || existing.driverId !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (existing.status !== "STARTED") {
      return res.status(400).json({ success: false, message: "Ride must be started first" });
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "COMPLETED" },
    });

    return res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to complete ride" });
  }
};

exports.cancelRide = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);

    const existing = await prisma.booking.findUnique({ where: { id: bookingId } });

    if (!existing) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const isCustomer = existing.customerId === req.user.id;
    const isDriver = existing.driverId === req.user.id;
    const isAdmin = req.user.role === "ADMIN";

    if (!isCustomer && !isDriver && !isAdmin) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (existing.status === "COMPLETED" || existing.status === "CANCELLED") {
      return res.status(400).json({ success: false, message: "Cannot cancel this booking" });
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });

    return res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to cancel ride" });
  }
};
