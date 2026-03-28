const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const { addDevice, getDevice } = require("../controller/device")

router.post("/add", authMiddleware, addDevice);
router.get("/list/:roomId", authMiddleware, getDevice);

module.exports = router;