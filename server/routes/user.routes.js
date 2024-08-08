const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// GET /user/:id
router.get("/user/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(id)
    .then((user) => {
      console.log("Retrieved user ->", user);
      res.json(user);
    })
    .catch((error) => {
      console.error("Error while retrieving user ->", error);
      res.status(500).send({ error: "Failed to retrieve user" });
    });
});

module.exports = router;