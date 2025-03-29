// routes/auth.routes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();
const saltRounds = 10;

// POST /auth/signup
router.post("/signup", (req, res) => {
  const { email, password, name } = req.body;

  // Validate input
  if (!email || !password || !name) {
    return res.status(400).json({ message: "Provide email, password, and name" });
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Create the user
  User.create({ email, password: hashedPassword, name })
    .then((user) => {
      res.status(201).json({ user: { _id: user._id, email: user.email, name: user.name } });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating user", error: err });
    });
});

// POST /auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Provide email and password" });
  }

  // Find the user
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Compare passwords
      const passwordCorrect = bcrypt.compareSync(password, user.password);
      if (!passwordCorrect) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      // Create a JWT
      const payload = { _id: user._id, email: user.email, name: user.name };
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "6h" });

      res.status(200).json({ authToken });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error logging in", error: err });
    });
});

// GET /auth/verify
router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

module.exports = router;