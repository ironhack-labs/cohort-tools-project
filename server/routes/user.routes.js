const express = require("express");
const User = require("../models/userModel");
const {isAuthenticated} = require ("../middleware/jwt.middleware");
const router = express.Router();


// GET /api/users/:id

router.get("/:userId", isAuthenticated, (req, res, next) => {
    const userId = Number(req.params.userId);
    User.findById(userId)
        .then((user) => {
            res.status(200).json(user); 
        })
        .catch((error) => {
            res.status(500).json({error: "Error while retrieving a user ID"});
        })
})

module.exports = router;