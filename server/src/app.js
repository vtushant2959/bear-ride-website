const express = require("express");
const cors    = require("cors");
const helmet  = require("helmet");
const morgan  = require("morgan");
const rateLimit = require("express-rate-limit");

const authRoutes          = require("./routes/authRoutes");
const bookingRoutes       = require("./routes/bookingRoutes");
const userRoutes          = require("./routes/userRoutes");
const adminRoutes         = require("./routes/adminRoutes");
const driverRoutes        = require("./routes/driverRoutes");
const ratingRoutes        = require("./routes/ratingRoutes");
const savedAddressRoutes  = require("./routes/savedAddressRoutes");
const walletRoutes        = require("./routes/walletRoutes");
const fleetRoutes         = require("./routes/fleetRoutes");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300, message: { success: false, message: "Too many requests" } });
app.use("/api/", limiter);

app.use("/api/auth",           authRoutes);
app.use("/api/bookings",       bookingRoutes);
app.use("/api/users",          userRoutes);
app.use("/api/admin",          adminRoutes);
app.use("/api/drivers",        driverRoutes);
app.use("/api/ratings",        ratingRoutes);
app.use("/api/saved-addresses",savedAddressRoutes);
app.use("/api/wallet",         walletRoutes);
app.use("/api/fleet",          fleetRoutes);

app.get("/", (req, res) => res.json({ success: true, message: "BearRide API Running" }));
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

module.exports = app;
