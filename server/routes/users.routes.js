const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/:userId", isAuthenticated, async (req, res, next) => {
  try {
    user = await User.findById(req.params.userId);
    res.status(200).json(user)
  } catch (error) {
    console.log("There was a problems while fetching the user: ", error)
    next(error)
  }
});

module.exports = router;
