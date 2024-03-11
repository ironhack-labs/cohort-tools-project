const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

const { isTokenValid } = require("../middlewares/auth.middlewares");

router.get("/:id", isTokenValid, async (req, res, next) => {
  try {
    const response = await User.findById(req.params.id).select({
      name: 1,
      email: 1,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }

  //   if (req.params.id === req.payload._id) {
  //     res.status(200).json(req.payload);
  //   } else {
  //     res.status().json({message: "no tienes permiso para acceder"});
  // };
});

module.exports = router;
