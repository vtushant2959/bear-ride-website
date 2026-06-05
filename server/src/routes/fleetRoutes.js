const router = require("express").Router();
const auth   = require("../middlewares/auth.middleware");
const ctrl   = require("../controllers/fleet.controller");
router.get("/",             auth, ctrl.getFleet);
router.post("/",            auth, ctrl.addVehicle);
router.patch("/:id",        auth, ctrl.updateVehicle);
router.delete("/:id",       auth, ctrl.deleteVehicle);
router.patch("/:id/toggle", auth, ctrl.toggleVehicle);
module.exports = router;
