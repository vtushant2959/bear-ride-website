const router = require("express").Router();
const auth   = require("../middlewares/auth.middleware");
const ctrl   = require("../controllers/savedAddress.controller");
router.get("/",        auth, ctrl.getAddresses);
router.post("/",       auth, ctrl.addAddress);
router.delete("/:id",  auth, ctrl.deleteAddress);
module.exports = router;
