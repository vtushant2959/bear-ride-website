const express = require("express");
const router = express.Router();
const { firebaseLogin, getMe } = require("../controllers/auth.controller");
const authenticate = require("../middlewares/auth.middleware");

router.post("/firebase-login", firebaseLogin);
router.get("/me", authenticate, getMe);

module.exports = router;
