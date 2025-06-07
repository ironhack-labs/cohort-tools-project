const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { signToken, authenticate } = require("../middleware/auth");

const router = express.Router();

// Signup route
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, name });

    res.status(201).json({ id: newUser._id, email: newUser.email, name: newUser.name });
  console.log("ajuhsdas");} 
  catch (err) {
    next(err);
  }
});

// Login route
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid email or password" });

    const token = signToken(user);
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

// Middleware to check if user is authenticated
router.get("/verify", authenticate, (req, res) => {
  res.json({ message: "Token valid", user: req.auth });
});

module.exports = router;
