const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer, folder, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `bearride/drivers/${folder}`,
        public_id: filename,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

exports.submitDocuments = async (req, res) => {
  try {
    const userId = req.user.id;

    // Only DRIVER role can submit documents
    if (req.user.role !== "DRIVER") {
      return res.status(403).json({ success: false, message: "Only drivers can submit documents" });
    }

    const { vehicleType, vehicleNumber, licenseNumber } = req.body;

    if (!vehicleType || !vehicleNumber || !licenseNumber) {
      return res.status(400).json({
        success: false,
        message: "vehicleType, vehicleNumber and licenseNumber are required",
      });
    }

    // Validate vehicle number format (Indian pattern: XX99XX9999)
    const vnRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    if (!vnRegex.test(vehicleNumber.toUpperCase().replace(/\s/g, ""))) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle number format (e.g. HR26AB1234)",
      });
    }

    // All four document images are required
    const requiredFiles = ["ownPhoto", "vehiclePhoto", "licensePhoto", "vehicleRC"];
    for (const field of requiredFiles) {
      if (!req.files?.[field]?.[0]) {
        return res.status(400).json({
          success: false,
          message: `${field} image is required`,
        });
      }
    }

    const tag = `user_${userId}_${Date.now()}`;

    // Upload all four images in parallel
    const [ownPhotoUrl, vehiclePhotoUrl, licensePhotoUrl, vehicleRCUrl] = await Promise.all([
      uploadToCloudinary(req.files.ownPhoto[0].buffer,    "own_photos",     `own_${tag}`),
      uploadToCloudinary(req.files.vehiclePhoto[0].buffer, "vehicle_photos", `vehicle_${tag}`),
      uploadToCloudinary(req.files.licensePhoto[0].buffer, "licenses",       `license_${tag}`),
      uploadToCloudinary(req.files.vehicleRC[0].buffer,   "vehicle_rc",     `rc_${tag}`),
    ]);

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        vehicleType,
        vehicleNumber: vehicleNumber.toUpperCase().replace(/\s/g, ""),
        licenseNumber,
        ownPhoto:     ownPhotoUrl,
        vehiclePhoto: vehiclePhotoUrl,
        licensePhoto: licensePhotoUrl,
        vehicleRC:    vehicleRCUrl,
        driverStatus: "PENDING",
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        role: true,
        vehicleType: true,
        vehicleNumber: true,
        licenseNumber: true,
        ownPhoto: true,
        vehiclePhoto: true,
        licensePhoto: true,
        vehicleRC: true,
        driverStatus: true,
        isActive: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Documents submitted. Awaiting admin verification.",
      user,
    });
  } catch (error) {
    console.error("SUBMIT DOCUMENTS ERROR:", error);
    return res.status(500).json({ success: false, message: "Document submission failed" });
  }
};

exports.getDriverStatus = async (req, res) => {
  try {
    if (req.user.role !== "DRIVER") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        driverStatus: true,
        vehicleType: true,
        vehicleNumber: true,
        licenseNumber: true,
        ownPhoto: true,
        vehiclePhoto: true,
        licensePhoto: true,
        vehicleRC: true,
      },
    });

    return res.status(200).json({ success: true, ...user });
  } catch (error) {
    console.error("GET DRIVER STATUS ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch driver status" });
  }
};
