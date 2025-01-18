const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Middleware for token verification
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.warn("Authorization header is missing.");
    return res.status(401).json({ status: "error", message: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.warn("Token is missing in Authorization header.");
    return res.status(401).json({ status: "error", message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded data to request
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.error("Token verification error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ status: "error", message: "Token has expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ status: "error", message: "Invalid token" });
    }

    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// POST /auth/signup - Register a new user
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ status: "error", message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      name: name.trim(),
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      data: { id: savedUser._id, email: savedUser.email, name: savedUser.name },
    });
  } catch (err) {
    console.error("Error during signup:", err.message);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// POST /auth/login - Authenticate user and return a JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: "error", message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ status: "error", message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: "error", message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "SuperTeamKatyaPriyaCristy",
      { expiresIn: "1h" }
    );

    res.json({
      status: "success",
      message: "Login successful",
      token,
      expiresIn: 3600,
      data: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// GET /auth/verify - Verify the JWT token
router.get("/verify", authMiddleware, (req, res) => {
  try {
    res.json({
      status: "success",
      message: "Token is valid",
      user: req.user,
    });
  } catch (err) {
    console.error("Verification failed:", err.message);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

module.exports = router;
