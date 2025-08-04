const router = require("express").Router();

const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


// GET /users/:userId - retrieve one user (protected route)
router.get("/users/:userId", isAuthenticated, (req, res, next) => {
    const { userId } = req.params;

    User.findById(userId)
        .select("-password") // without password
        .then((userFromDB) => {
            if (!userFromDB) {
                res.status(404).json({ message: "User not found." });
                return;
            }

            res.json(userFromDB);
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;
