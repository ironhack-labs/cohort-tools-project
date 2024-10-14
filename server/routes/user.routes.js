const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth.middlewares");

const User = require("../models/Users.model");

router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const response = await User.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
