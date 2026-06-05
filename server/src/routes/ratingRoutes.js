const router = require("express").Router();
const auth   = require("../middlewares/auth.middleware");
const ctrl   = require("../controllers/rating.controller");
router.post("/",          auth, ctrl.submitRating);
router.get("/driver/:id", ctrl.getDriverRatings);
module.exports = router;
