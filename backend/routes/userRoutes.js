const express = require("express");
const User = require("../models/userSchema");
const ExpressError = require("../utils/ExpressError");
const { verifyUser } = require("../middleware/middleware");
const WrapAsync = require("../utils/WrapAsync");
const {
  registerUser,
  loginUser,
  userProfile,
  logoutUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", WrapAsync(registerUser));

router.post("/login", WrapAsync(loginUser));

router.get("/profile", verifyUser, userProfile);

router.post("/logout", logoutUser);

module.exports = router;
