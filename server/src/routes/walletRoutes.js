const router = require("express").Router();
const auth   = require("../middlewares/auth.middleware");
const ctrl   = require("../controllers/wallet.controller");
router.get("/transactions",   auth, ctrl.getTransactions);
router.post("/create-order",  auth, ctrl.createOrder);
router.post("/verify-payment",auth, ctrl.verifyPayment);
module.exports = router;
