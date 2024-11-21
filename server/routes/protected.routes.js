const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

const express = require("express");

router.get("/users/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ error: "No user found" });
    });
});

module.exports = router;
