const prisma = require("../config/prisma");

exports.getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query;

    const where = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        role: true,
        isVerified: true,
        isActive: true,
        walletBalance: true,
        vehicleType: true,
        vehicleNumber: true,
        businessName: true,
        createdAt: true,
        _count: { select: { customerBookings: true, driverBookings: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("GET ALL USERS ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        role: true,
        isVerified: true,
        isActive: true,
        walletBalance: true,
        vehicleType: true,
        vehicleNumber: true,
        licenseNumber: true,
        businessName: true,
        businessType: true,
        createdAt: true,
        _count: { select: { customerBookings: true, driverBookings: true } },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { role } = req.body;

    const validRoles = ["CUSTOMER", "DRIVER", "VENDOR", "ADMIN"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to update role" });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
    });

    return res.status(200).json({ success: true, user: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to toggle user status" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;

    const where = {};
    if (status) where.status = status;

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        customer: { select: { fullName: true, phone: true } },
        driver: { select: { fullName: true, phone: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalCustomers = await prisma.user.count({ where: { role: "CUSTOMER" } });
    const totalDrivers = await prisma.user.count({ where: { role: "DRIVER" } });
    const totalVendors = await prisma.user.count({ where: { role: "VENDOR" } });

    const totalBookings = await prisma.booking.count();
    const pendingBookings = await prisma.booking.count({ where: { status: "PENDING" } });
    const activeBookings = await prisma.booking.count({ where: { status: { in: ["ACCEPTED", "STARTED"] } } });
    const completedBookings = await prisma.booking.count({ where: { status: "COMPLETED" } });
    const cancelledBookings = await prisma.booking.count({ where: { status: "CANCELLED" } });

    const completedRides = await prisma.booking.findMany({ where: { status: "COMPLETED" } });
    const totalRevenue = completedRides.reduce((sum, b) => sum + b.fare, 0);

    const recentBookings = await prisma.booking.findMany({
      take: 10,
      include: {
        customer: { select: { fullName: true, phone: true } },
        driver: { select: { fullName: true, phone: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const recentUsers = await prisma.user.findMany({
      take: 10,
      select: { id: true, fullName: true, phone: true, role: true, createdAt: true, isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCustomers,
        totalDrivers,
        totalVendors,
        totalBookings,
        pendingBookings,
        activeBookings,
        completedBookings,
        cancelledBookings,
        totalRevenue,
      },
      recentBookings,
      recentUsers,
    });
  } catch (error) {
    console.error("ADMIN STATS ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch admin stats" });
  }
};

exports.approveDriver = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await prisma.user.update({
      where: { id: userId },
      data: { driverStatus: "APPROVED", isActive: true },
      select: { id: true, fullName: true, phone: true, driverStatus: true },
    });
    return res.json({ success: true, user, message: "Driver approved" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to approve driver" });
  }
};

exports.rejectDriver = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { reason } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { driverStatus: "REJECTED" },
      select: { id: true, fullName: true, phone: true, driverStatus: true },
    });
    return res.json({ success: true, user, message: "Driver rejected" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to reject driver" });
  }
};

exports.getPendingDrivers = async (req, res) => {
  try {
    const drivers = await prisma.user.findMany({
      where: { driverStatus: "PENDING" },
      select: {
        id: true, fullName: true, phone: true, email: true,
        vehicleType: true, vehicleNumber: true, licenseNumber: true,
        profilePhoto: true, vehicleRC: true, driverStatus: true, createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ success: true, drivers });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch pending drivers" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    if (userId === req.user.id) {
      return res.status(400).json({ success: false, message: "Cannot delete yourself" });
    }

    await prisma.booking.deleteMany({ where: { OR: [{ customerId: userId }, { driverId: userId }] } });
    await prisma.user.delete({ where: { id: userId } });

    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};
