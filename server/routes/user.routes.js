const express = require("express")
const User = require("../models/User.model")
const { isAuthenticated } = require("./../middleware/jwt.middleware.js")
const router = express.Router()

//GET UserRoute

router.get("/:id", (req, res, next) => {
User.findById(req.params.id)

.then(user => {
    console.log("Found user", user)
    res.status(200).json(user)
})
.catch(err => {
    res.status(500).json({ message: "Could not find User"})
})
})

module.exports = router; 