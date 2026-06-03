const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");
const admin = require("../config/firebase");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, phone: user.phone, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.firebaseLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: "Token is required" });
    }

    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid Firebase token" });
    }

    const phone = decodedToken.phone_number;
    const firebaseUid = decodedToken.uid;

    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone number not found in token" });
    }

    let user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      const registerData = req.body.registerData;

      user = await prisma.user.create({
        data: {
          fullName: registerData?.fullName || "BearRide User",
          phone,
          email: registerData?.email || null,
          role: registerData?.role || "CUSTOMER",
          firebaseUid,
          isVerified: true,
        },
      });
    } else {
      if (!user.firebaseUid) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { firebaseUid, isVerified: true },
        });
      }
    }

    const jwtToken = generateToken(user);

    const safeUser = {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      walletBalance: user.walletBalance,
      vehicleType: user.vehicleType,
      vehicleNumber: user.vehicleNumber,
      businessName: user.businessName,
      isActive: user.isActive,
    };

    return res.status(200).json({
      success: true,
      token: jwtToken,
      user: safeUser,
    });
  } catch (error) {
    console.error("FIREBASE LOGIN ERROR:", error);
    return res.status(500).json({ success: false, message: "Authentication failed" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
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

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("GET ME ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
};
