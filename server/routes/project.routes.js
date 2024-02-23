const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

// POST /api/users - Creates a new user
router.post("/users", (req, res, next) => {
  const { email, password, name } = req.body;

  // Check if required fields are provided
  if (!email || !password || !name) {
    res.status(400).json({ message: "Provide email, password, and name" });
    return;
  }

  // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // Check if password meets requirements
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase, and one uppercase letter.",
    });
    return;
  }

  // Check if user already exists
  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create new user
      return User.create({ email, password: hashedPassword, name });
    })
    .then((createdUser) => {
      res.status(201).json({ user: createdUser });
    })
    .catch((err) => {
      console.log("Error while creating the user", err);
      res.status(500).json({ message: "Error while creating the user" });
    });
});

// GET /api/users - Retrieves all users
router.get("/users", (req, res, next) => {
  User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((err) => {
      console.log("Error while getting the users", err);
      res.status(500).json({ message: "Error while getting the users" });
    });
});

// GET /api/users/:userId - Retrieves a specific user by id
router.get("/users/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("Error while retrieving the user", err);
      res.status(500).json({ message: "Error while retrieving the user" });
    });
});

// PUT /api/users/:userId - Updates a specific user by id
router.put("/users/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log("Error while updating the user", err);
      res.status(500).json({ message: "Error while updating the user" });
    });
});

// DELETE /api/users/:userId - Deletes a specific user by id
router.delete("/users/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndDelete(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(204).json();
    })
    .catch((err) => {
      console.log("Error while deleting the user", err);
      res.status(500).json({ message: "Error while deleting the user" });
    });
});

module.exports = router;
