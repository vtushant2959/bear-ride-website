const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer, folder, filename) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `bearride/${folder}`, public_id: filename, resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }] },
      (err, result) => { if (err) reject(err); else resolve(result.secure_url); }
    );
    stream.end(buffer);
  });

exports.completeRegistration = async (req, res) => {
  try {
    const userId = req.user.id;
    const role   = req.user.role;
    const tag    = `user_${userId}_${Date.now()}`;
    const data   = {};

    // Profile photo — required for all roles
    if (req.files?.profilePhoto?.[0]) {
      data.profilePhoto = await uploadToCloudinary(
        req.files.profilePhoto[0].buffer, "profile_photos", `profile_${tag}`
      );
    }

    if (role === "DRIVER") {
      const { vehicleType, vehicleNumber, licenseNumber } = req.body;
      if (vehicleType)    data.vehicleType    = vehicleType;
      if (vehicleNumber)  data.vehicleNumber  = vehicleNumber.toUpperCase().replace(/\s/g, "");
      if (licenseNumber)  data.licenseNumber  = licenseNumber;
      if (req.files?.vehicleRC?.[0]) {
        data.vehicleRC = await uploadToCloudinary(
          req.files.vehicleRC[0].buffer, "vehicle_rc", `rc_${tag}`
        );
      }
      // Mark pending only when both vehicle number and RC are provided
      if (data.vehicleNumber && data.vehicleRC) {
        data.driverStatus = "PENDING";
      }
    }

    if (role === "VENDOR") {
      const { businessName, gstNumber, address } = req.body;
      if (businessName) data.businessName = businessName;
      if (gstNumber)    data.gstNumber    = gstNumber;
      if (address)      data.address      = address;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true, fullName: true, phone: true, email: true, role: true,
        isVerified: true, walletBalance: true, profilePhoto: true,
        vehicleType: true, vehicleNumber: true, licenseNumber: true,
        vehicleRC: true, driverStatus: true,
        businessName: true, businessType: true, address: true, gstNumber: true,
        isActive: true, createdAt: true,
      },
    });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("COMPLETE REGISTRATION ERROR:", error);
    return res.status(500).json({ success: false, message: "Registration completion failed" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, email, vehicleType, vehicleNumber, licenseNumber, businessName, businessType, driverStatus } = req.body;

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
        ownPhoto: true,
        vehiclePhoto: true,
        licensePhoto: true,
        vehicleRC: true,
        driverStatus: true,
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
