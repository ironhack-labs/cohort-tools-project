const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Make sure to replace with a secure secret in production


router.post("/signup", async (req, res) => {
  console.log("Request Body:", req.body);

  const { firstName, lastName, email, phone, program, cohort, password } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !phone || !program || !cohort || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if cohort exists
    const cohortData = await Cohort.findById(cohort);
    if (!cohortData) {
      return res.status(400).json({ message: "Invalid cohort ID" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create and save the new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      program,
      cohort,
      password,  // Consider hashing the password before saving
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const payload = { userId: user._id, name: user.name };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Send back the token
    res.json({ message: "Login successful", authToken: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
