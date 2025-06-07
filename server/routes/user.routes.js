const express = require("express");
const User = require("../models/user.model");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// Get user by id - protected route
router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
