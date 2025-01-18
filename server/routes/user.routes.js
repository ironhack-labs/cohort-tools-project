// routes/user.routes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming you have a User model

// Example route to get all users (if needed)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Add more routes for user authentication, etc.

module.exports = router;
