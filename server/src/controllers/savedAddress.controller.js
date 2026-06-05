const prisma = require("../config/prisma");

exports.getAddresses = async (req, res) => {
  const addrs = await prisma.savedAddress.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: "desc" } });
  return res.json({ success: true, addresses: addrs });
};

exports.addAddress = async (req, res) => {
  try {
    const { label, address, lat, lng } = req.body;
    if (!label || !address) return res.status(400).json({ success: false, message: "label and address required" });
    const addr = await prisma.savedAddress.create({
      data: { userId: req.user.id, label, address, lat: lat || null, lng: lng || null },
    });
    return res.status(201).json({ success: true, address: addr });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to save address" });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const addr = await prisma.savedAddress.findUnique({ where: { id } });
    if (!addr || addr.userId !== req.user.id) return res.status(404).json({ success: false, message: "Address not found" });
    await prisma.savedAddress.delete({ where: { id } });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete address" });
  }
};
