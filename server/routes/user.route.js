const express = require("express");
const User = require("../models/User.model");
const { verifyJWT } = require("../middleware/verify.jwt");
const userRouter = express.Router();

// /api/users/:id
userRouter.get("/users/:id", verifyJWT, async (req, res) => {
  const { _id } = req.payload;

  try {
    const user = await User.findOne({ _id });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user", error });
  }
});

module.exports = userRouter;
