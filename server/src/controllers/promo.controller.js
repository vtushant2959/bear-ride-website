const prisma = require("../config/prisma");

exports.validatePromo = async (req, res) => {
  try {
    const { code, fare } = req.body;
    if (!code) return res.status(400).json({ success: false, message: "Code required" });

    const promo = await prisma.promoCode.findUnique({ where: { code: code.toUpperCase() } });
    if (!promo || !promo.isActive) return res.status(404).json({ success: false, message: "Invalid or expired promo code" });
    if (promo.expiresAt && new Date() > promo.expiresAt) return res.status(400).json({ success: false, message: "Promo code expired" });
    if (promo.usedCount >= promo.maxUses) return res.status(400).json({ success: false, message: "Promo code limit reached" });
    if (fare && Number(fare) < promo.minFare) return res.status(400).json({ success: false, message: `Minimum fare ₹${promo.minFare} required` });

    // Check if user already used this code
    const used = await prisma.promoUsage.findFirst({ where: { promoId: promo.id, userId: req.user.id } });
    if (used) return res.status(400).json({ success: false, message: "You've already used this code" });

    const discount = promo.type === "PERCENTAGE"
      ? Math.min((Number(fare) * promo.discount) / 100, 500)
      : promo.discount;

    return res.json({ success: true, promo: { id: promo.id, code: promo.code, discount, type: promo.type, discountAmount: discount } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Promo validation failed" });
  }
};

// Admin
exports.createPromo = async (req, res) => {
  try {
    const { code, discount, type, maxUses, minFare, expiresAt } = req.body;
    if (!code || !discount) return res.status(400).json({ success: false, message: "code and discount required" });
    const promo = await prisma.promoCode.create({
      data: {
        code: code.toUpperCase(), discount: Number(discount),
        type: type || "PERCENTAGE", maxUses: maxUses || 100,
        minFare: minFare || 0,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });
    return res.status(201).json({ success: true, promo });
  } catch (err) {
    if (err.code === "P2002") return res.status(400).json({ success: false, message: "Code already exists" });
    return res.status(500).json({ success: false, message: "Failed to create promo" });
  }
};

exports.getPromos = async (req, res) => {
  const promos = await prisma.promoCode.findMany({ orderBy: { createdAt: "desc" } });
  return res.json({ success: true, promos });
};

exports.deletePromo = async (req, res) => {
  await prisma.promoCode.delete({ where: { id: Number(req.params.id) } });
  return res.json({ success: true });
};

exports.togglePromo = async (req, res) => {
  const promo = await prisma.promoCode.findUnique({ where: { id: Number(req.params.id) } });
  if (!promo) return res.status(404).json({ success: false, message: "Not found" });
  const updated = await prisma.promoCode.update({ where: { id: promo.id }, data: { isActive: !promo.isActive } });
  return res.json({ success: true, promo: updated });
};
