const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// GET /api/users/:userId - Retrieves a specific User by id
router.get("/users/:userId", (req, res, next) => {
  const userId = req.params.userId; // Corrected to req.params

  User.findById(userId)
    .then((user) => {
      if (user) {
        console.log("Retrieved user ->", user);
        res.json(user);
      } else {
        const error = new Error("User not found");
        error.status = 404;
        next(error);
      }
    })
    .catch((error) => {
      console.error("Error while retrieving user ->", error);
      error.message = "Failed to retrieve user";
      error.status = 500;
      next(error);
    });
});

module.exports = router;
