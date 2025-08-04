const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");

router.get("/:userId", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw { status: 400, message: "Invalid ID" };
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;