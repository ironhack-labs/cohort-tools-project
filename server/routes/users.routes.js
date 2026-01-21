const router = require("express").Router();
const User = require("../models/User");
const authenticate = require("../middleware/jwt.middleware");
const CustomError = require("../error-handling/CustomError");

// Get user profile by ID

router.get("/:id", authenticate, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return next(new CustomError("User not found", 404));
        res.json(user);
    } catch (error) {
        next(new CustomError("Error retrieving user", 500));
    }
});

module.exports = router;