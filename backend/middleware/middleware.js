const User = require("../models/userSchema");
const ExpressError = require("../utils/ExpressError");
const jwt = require("jsonwebtoken");

module.exports.verifyUser = async (req, res, next) => {
  // console.log(req.cookies);
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new ExpressError(401, "Unauthorized"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return next(new ExpressError(403, "Invalid or expired token"));
  }
};
