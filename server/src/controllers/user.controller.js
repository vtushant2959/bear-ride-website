const prisma = require("../config/prisma");

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, email, vehicleType, vehicleNumber, licenseNumber, businessName, businessType } = req.body;

    const data = {};
    if (fullName) data.fullName = fullName;
    if (email !== undefined) data.email = email;
    if (vehicleType !== undefined) data.vehicleType = vehicleType;
    if (vehicleNumber !== undefined) data.vehicleNumber = vehicleNumber;
    if (licenseNumber !== undefined) data.licenseNumber = licenseNumber;
    if (businessName !== undefined) data.businessName = businessName;
    if (businessType !== undefined) data.businessType = businessType;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data,
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        role: true,
        isVerified: true,
        walletBalance: true,
        vehicleType: true,
        vehicleNumber: true,
        licenseNumber: true,
        businessName: true,
        businessType: true,
        isActive: true,
        createdAt: true,
      },
    });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};

exports.getWallet = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { walletBalance: true },
    });

    return res.status(200).json({ success: true, walletBalance: user.walletBalance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch wallet" });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let bookings;
    if (role === "DRIVER") {
      bookings = await prisma.booking.findMany({ where: { driverId: userId } });
    } else {
      bookings = await prisma.booking.findMany({ where: { customerId: userId } });
    }

    const total = bookings.length;
    const completed = bookings.filter((b) => b.status === "COMPLETED").length;
    const active = bookings.filter((b) => ["PENDING", "ACCEPTED", "STARTED"].includes(b.status)).length;
    const cancelled = bookings.filter((b) => b.status === "CANCELLED").length;
    const totalEarnings = bookings
      .filter((b) => b.status === "COMPLETED")
      .reduce((sum, b) => sum + b.fare, 0);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletBalance: true },
    });

    return res.status(200).json({
      success: true,
      stats: { total, completed, active, cancelled, totalEarnings, walletBalance: user.walletBalance },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};
