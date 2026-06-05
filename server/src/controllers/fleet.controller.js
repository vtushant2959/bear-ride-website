const prisma = require("../config/prisma");

exports.getFleet = async (req, res) => {
  const vehicles = await prisma.fleetVehicle.findMany({
    where: { vendorId: req.user.id },
    orderBy: { createdAt: "desc" },
  });
  return res.json({ success: true, vehicles });
};

exports.addVehicle = async (req, res) => {
  try {
    const { vehicleType, vehicleNumber, driverName, driverPhone } = req.body;
    if (!vehicleType || !vehicleNumber) return res.status(400).json({ success: false, message: "vehicleType and vehicleNumber required" });
    const v = await prisma.fleetVehicle.create({
      data: { vendorId: req.user.id, vehicleType, vehicleNumber: vehicleNumber.toUpperCase(), driverName: driverName || null, driverPhone: driverPhone || null },
    });
    return res.status(201).json({ success: true, vehicle: v });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to add vehicle" });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const v = await prisma.fleetVehicle.findUnique({ where: { id } });
    if (!v || v.vendorId !== req.user.id) return res.status(404).json({ success: false, message: "Vehicle not found" });
    const updated = await prisma.fleetVehicle.update({ where: { id }, data: req.body });
    return res.json({ success: true, vehicle: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to update vehicle" });
  }
};

exports.deleteVehicle = async (req, res) => {
  const id = Number(req.params.id);
  const v = await prisma.fleetVehicle.findUnique({ where: { id } });
  if (!v || v.vendorId !== req.user.id) return res.status(404).json({ success: false, message: "Not found" });
  await prisma.fleetVehicle.delete({ where: { id } });
  return res.json({ success: true });
};

exports.toggleVehicle = async (req, res) => {
  const id = Number(req.params.id);
  const v = await prisma.fleetVehicle.findUnique({ where: { id } });
  if (!v || v.vendorId !== req.user.id) return res.status(404).json({ success: false });
  const updated = await prisma.fleetVehicle.update({ where: { id }, data: { isActive: !v.isActive } });
  return res.json({ success: true, vehicle: updated });
};
