const express = require("express");
const User = require("../models/user.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();


router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
