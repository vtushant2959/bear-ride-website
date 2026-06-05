const prisma = require("../config/prisma");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const getRazorpay = () => new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.getTransactions = async (req, res) => {
  const txns = await prisma.walletTransaction.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { walletBalance: true } });
  return res.json({ success: true, transactions: txns, walletBalance: user.walletBalance });
};

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // in rupees
    if (!amount || amount < 10) return res.status(400).json({ success: false, message: "Minimum top-up ₹10" });

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: `wallet_${req.user.id}_${Date.now()}`,
    });

    return res.json({ success: true, order, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("RAZORPAY ORDER ERROR:", err);
    return res.status(500).json({ success: false, message: "Payment initiation failed" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body).digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    const rupees = Number(amount) / 100;

    // Credit wallet
    const [user] = await Promise.all([
      prisma.user.update({
        where: { id: req.user.id },
        data: { walletBalance: { increment: rupees } },
      }),
      prisma.walletTransaction.create({
        data: { userId: req.user.id, amount: rupees, type: "CREDIT",
          description: "Wallet Top-up via Razorpay", reference: razorpay_payment_id },
      }),
    ]);

    return res.json({ success: true, walletBalance: user.walletBalance });
  } catch (err) {
    console.error("VERIFY PAYMENT ERROR:", err);
    return res.status(500).json({ success: false, message: "Verification failed" });
  }
};
