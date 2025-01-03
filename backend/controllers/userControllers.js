const User = require("../models/userSchema");
const ExpressError = require("../utils/ExpressError");

const registerUser = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ExpressError(404, "Email already exists"));
  }

  const hashedPassword = await User.hashPassword(password);
  const newUser = new User({
    fullName: {
      firstName: fullName.firstName,
      lastName: fullName.lastName,
    },
    email: email,
    password: hashedPassword,
  });
  const registerUser = await newUser.save();
  const token = await registerUser.generateToken();
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ token, registerUser });
  console.log(req.body);
};
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ExpressError(401, "please inter valid details"));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ExpressError(401, "Invalid email or password"));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ExpressError(401, "Invalid email or password"));
  }
  const token = await user.generateToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};
const userProfile = (req, res) => {
  res.status(200).json(req.user);
};
const logoutUser = (req, res, next) => {
  res.clearCookie("token", { httpOnly: true, secure: true });
  req.user = " ";
  res.status(200).json({ message: "logout successfully" });
};

module.exports = { registerUser, loginUser, userProfile, logoutUser };
