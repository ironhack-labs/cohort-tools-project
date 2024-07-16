const express = require("express");
const router = express.Router();
const User = require("../models/User.model")
const { isAuthenticated } = require("./../middleware/jwt.middleware");

router.get("api/users/:id", isAuthenticated,  (req, res, next) =>{
    const id = req.params.id;
    User.findById(id)
    .then((oneUser) =>{
        const { email, name, _id } = oneUser;
        const user = { email, name, _id };
        res.status(201).json({ user: user });
    })
    .catch((err) => {
        console.error("Failed to get one user", err);
        res.status(500).json({ err: err });
      })
})

module.exports = router;