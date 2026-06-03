const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const {
  getAllUsers,
  getUserById,
  updateUserRole,
  toggleUserStatus,
  getAllBookings,
  getAdminStats,
  deleteUser,
} = require("../controllers/admin.controller");

router.use(authenticate, authorize("ADMIN"));

router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/role", updateUserRole);
router.patch("/users/:id/toggle-status", toggleUserStatus);
router.delete("/users/:id", deleteUser);
router.get("/bookings", getAllBookings);

module.exports = router;
