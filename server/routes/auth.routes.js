const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomError = require("../error-handling/CustomError");

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return next(
        new CustomError("Name, email and password are required", 400)
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new CustomError("Email already in use", 409));
    }
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    next(new CustomError("Error creating user", 500));
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new CustomError("Email and password are required", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomError("Invalid email or password", 401));
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return next(new CustomError("Invalid email or password", 401));
    }
    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.status(200).json({
      message: "Login successful",
      authToken: token,
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(new CustomError("Error logging in user", 500));
  }
});

const authenticate = require("../middleware/jwt.middleware");

router.get("/verify", authenticate, (req, res) => {
  res
    .status(200)
    .json({
      message: "Token is valid",
      _id: req.auth.userId,
      email: req.auth.email,
      name: req.auth.name,
    });
});

module.exports = router;
