const express = require("express");
const router = express.Router();
const User = require("../models/UserModels");
const { isAuthenticated } = require("../midleware/jwt.midleware");

// GET /api/users/:id
router.get('/api/users/:id', isAuthenticated, (req, res, next) => {
    const { id } = req.params;

    User.findById(id)
        .then((foundUser) => {
            if (!foundUser) {
                res.status(404).json({ message: "User not found." });
                return;
            }

            const { email, name, _id } = foundUser;
            const user = { email, name, _id };
            res.status(200).json({ user: user });
        })
        .catch(err => {
            console.log("Error trying to fetch user...\n\n", err);
            res.status(500).json({ message: "Internal Server Error" })
        });
});

module.exports = router;
