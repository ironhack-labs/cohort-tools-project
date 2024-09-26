const { isAuthenticated } = require("../middleware/route-gaurd");
const router = require("express").Router();
const User = require("../models/User.model");

router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const userData = await User.findById(req.params.id);
    res.status(200).json({ userData });
  } catch (error) {
    console.error("Error while fetching user data");
    next(error);
  }
});

module.exports = router;