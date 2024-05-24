require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST /auth/signup
router.post("/auth/signup", async (req, res) => {
  const { email, name, password } = req.body;

  // Check if email, password, and name are provided
  if (!email || !name || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email, password, and name" });
  }

  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Provide a valid email address." });
  }

  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
  }

  try {
    // Check if user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user
    const createdUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    const { _id } = createdUser;
    const user = { email, name, _id };

    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /auth/login
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    // Find user in DB
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the saved one in the database
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
    if (passwordCorrect) {
      const { _id, name } = foundUser;
      const payload = { _id, email, name };

      const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      res.json({ authToken });
    } else {
      res.status(401).json({ message: "Unable to authenticate the user" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /auth/verify - Used to verify JWT stored on the client
router.get("/auth/verify", isAuthenticated, (req, res) => {
  console.log("req.payload", req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;
