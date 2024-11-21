const express = require("express");
const User = require("../models/user");
const Cohort = require("../models/cohort");
const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, program, cohort, profileImage } = req.body;

  try {
    // Check if the cohort exists
    const cohortExists = await Cohort.findById(cohort);
    if (!cohortExists) {
      return res.status(400).json({ error: "Invalid cohort ID" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      program,
      cohort,
      profileImage,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("cohort");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("cohort");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user details
router.put("/:id", async (req, res) => {
  const { firstName, lastName, email, phone, program, cohort, profileImage } = req.body;

  try {
    // Validate cohort if provided
    if (cohort) {
      const cohortExists = await Cohort.findById(cohort);
      if (!cohortExists) {
        return res.status(400).json({ error: "Invalid cohort ID" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { firstName, lastName, email, phone, program, cohort, profileImage }},
      { new: true, runValidators: true }
    ).populate("cohort");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
