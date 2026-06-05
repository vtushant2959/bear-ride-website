const express = require("express");
const router  = express.Router();
const auth    = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const admin   = require("../controllers/admin.controller");
const promo   = require("../controllers/promo.controller");

router.use(auth, authorize("ADMIN"));

// Stats & users
router.get("/stats",                   admin.getAdminStats);
router.get("/users",                   admin.getAllUsers);
router.get("/users/:id",               admin.getUserById);
router.patch("/users/:id/role",        admin.updateUserRole);
router.patch("/users/:id/toggle-status", admin.toggleUserStatus);
router.delete("/users/:id",            admin.deleteUser);
router.get("/bookings",                admin.getAllBookings);

// Driver approval
router.get("/drivers/pending",         admin.getPendingDrivers);
router.patch("/drivers/:id/approve",   admin.approveDriver);
router.patch("/drivers/:id/reject",    admin.rejectDriver);

// Promo codes
router.get("/promos",                  promo.getPromos);
router.post("/promos",                 promo.createPromo);
router.delete("/promos/:id",           promo.deletePromo);
router.patch("/promos/:id/toggle",     promo.togglePromo);

module.exports = router;
