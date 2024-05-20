const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

router.get("/users/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ message: "Error while getting the users" }));
})

module.exports = router;
