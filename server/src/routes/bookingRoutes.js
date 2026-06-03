const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const {
  createBooking,
  getCustomerBookings,
  getBookingById,
  updateBookingStatus,
  getPendingBookings,
  acceptBooking,
  getDriverBookings,
  startRide,
  completeRide,
  cancelRide,
} = require("../controllers/booking.controller");

router.post("/", authenticate, authorize("CUSTOMER"), createBooking);
router.get("/my-rides", authenticate, authorize("CUSTOMER"), getCustomerBookings);
router.get("/my-driver-rides", authenticate, authorize("DRIVER"), getDriverBookings);
router.get("/pending", authenticate, authorize("DRIVER", "ADMIN"), getPendingBookings);
router.get("/:id", authenticate, getBookingById);
router.patch("/:id/status", authenticate, authorize("ADMIN"), updateBookingStatus);
router.patch("/:id/accept", authenticate, authorize("DRIVER"), acceptBooking);
router.patch("/:id/start", authenticate, authorize("DRIVER"), startRide);
router.patch("/:id/complete", authenticate, authorize("DRIVER"), completeRide);
router.patch("/:id/cancel", authenticate, cancelRide);

module.exports = router;
