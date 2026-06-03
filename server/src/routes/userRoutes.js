const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const { updateProfile, getWallet, getDashboardStats } = require("../controllers/user.controller");

router.patch("/profile", authenticate, updateProfile);
router.get("/wallet", authenticate, getWallet);
router.get("/dashboard-stats", authenticate, getDashboardStats);

module.exports = router;
