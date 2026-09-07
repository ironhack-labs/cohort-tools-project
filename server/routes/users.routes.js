const express = require("express")
const router = express.Router()

const User = require("../models/users.model")
const { verifyToken } = require("../middlewares/auth.middlewares")

router.get("/:userId", verifyToken, (req, res, next) => {
     User.findById(req.params.userId)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((error) => {
        next(error)
        });
    });

    module.exports = router