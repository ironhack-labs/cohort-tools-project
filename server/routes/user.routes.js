const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");

// Protected API
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    //Fetch user in Database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Return user
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
});

module.exports = router;
