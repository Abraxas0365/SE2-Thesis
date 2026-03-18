const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const { registerUser, loginUser, isFirstTime } = require("../controller/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/first-login", authMiddleware, isFirstTime);

module.exports = router;