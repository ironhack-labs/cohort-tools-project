const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middlewares");

// GET /api/user/:id - Get user profile by ID
router.get("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

module.exports = router;
