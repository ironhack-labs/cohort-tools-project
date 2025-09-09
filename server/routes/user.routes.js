const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const validateToken = require("../middlewares/auth.middleware");

// GET /api/users/:id - Retrieves a specific user by id. The route should be protected by the authentication middleware
router.get("/:userId", validateToken, async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.userId);
    if (!foundUser) {
      res.status(400).json({ errorMessage: "The user doesn't exist" });
      return;
    }
    res.status(200).json({ id: foundUser._id, email: foundUser.email, name: foundUser.name });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router