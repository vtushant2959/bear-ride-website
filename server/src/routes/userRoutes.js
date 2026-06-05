const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const { completeRegistration, addRole, updateProfile, getWallet, getDashboardStats } = require("../controllers/user.controller");

const regUpload = upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "vehicleRC",    maxCount: 1 },
]);

router.post("/complete-registration", authenticate, regUpload, completeRegistration);
router.post("/add-role",              authenticate, regUpload, addRole);
router.patch("/profile",              authenticate, updateProfile);
router.get("/wallet",                 authenticate, getWallet);
router.get("/dashboard-stats",        authenticate, getDashboardStats);

module.exports = router;
