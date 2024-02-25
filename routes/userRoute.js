const express = require("express");
const router = express.Router();
const { register, login, checkUser } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

//register route
router.post("/register", register);
//login user
router.post("/login", login);
router.get("/check", authMiddleware, checkUser);
module.exports = router;
