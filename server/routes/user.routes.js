const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/users/:id", isAuthenticated, (req, res) => {
    const { id } = req.params;

    User.findById(id)
        .select("-password")
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error retrieving user" });
        });
});

module.exports = router;
