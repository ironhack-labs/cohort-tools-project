const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

router.get("/:id", (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Project document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  User.findById(id)
    //.populate("tasks")
    .then((user) => res.status(200).json(user))
    .catch((error) => res.json(error));
});

module.exports = router;
