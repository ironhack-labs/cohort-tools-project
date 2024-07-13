const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/User.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

const router = express.Router();

router.get("/users/:id", isAuthenticated, (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const { email, name, _id } = user;
      res.status(200).json({ email, name, _id });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
