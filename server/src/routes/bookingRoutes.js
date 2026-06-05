const express   = require("express");
const router    = express.Router();
const auth      = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const ctrl      = require("../controllers/booking.controller");
const promo     = require("../controllers/promo.controller");

// Fare calculator (public)
router.get("/calculate-fare", ctrl.calculateFare);

// Promo validation (authenticated)
router.post("/validate-promo", auth, promo.validatePromo);

// Booking CRUD
router.post("/",                auth, authorize("CUSTOMER"), ctrl.createBooking);
router.get("/my-rides",         auth, authorize("CUSTOMER"), ctrl.getCustomerBookings);
router.get("/my-driver-rides",  auth, authorize("DRIVER"),   ctrl.getDriverBookings);
router.get("/pending",          auth, authorize("DRIVER", "ADMIN"), ctrl.getPendingBookings);

// Scheduled rides
router.post("/schedule",        auth, authorize("CUSTOMER"), ctrl.createScheduled);
router.get("/scheduled",        auth, authorize("CUSTOMER"), ctrl.getScheduledRides);
router.patch("/scheduled/:id/cancel", auth, ctrl.cancelScheduled);

router.get("/:id",              auth, ctrl.getBookingById);
router.patch("/:id/status",     auth, authorize("ADMIN"),    ctrl.updateBookingStatus);
router.patch("/:id/accept",     auth, authorize("DRIVER"),   ctrl.acceptBooking);
router.patch("/:id/start",      auth, authorize("DRIVER"),   ctrl.startRide);
router.patch("/:id/complete",   auth, authorize("DRIVER"),   ctrl.completeRide);
router.patch("/:id/cancel",     auth, ctrl.cancelRide);

module.exports = router;
