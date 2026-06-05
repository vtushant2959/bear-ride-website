const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const { submitDocuments, getDriverStatus } = require("../controllers/driver.controller");

const docUpload = upload.fields([
  { name: "ownPhoto",     maxCount: 1 },
  { name: "vehiclePhoto", maxCount: 1 },
  { name: "licensePhoto", maxCount: 1 },
  { name: "vehicleRC",    maxCount: 1 },
]);

router.post("/submit-documents", authenticate, docUpload, submitDocuments);
router.get("/status",            authenticate, getDriverStatus);

module.exports = router;
