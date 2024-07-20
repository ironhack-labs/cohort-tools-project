
const { default: mongoose } = require("mongoose");
const User = require("../models/User.model");
const { isAuthenticated } = require('../middlewares/route-guard.middleware')


const router = require("express").Router();
// All routes starts with /api/users

router.get("/", async (req, res) => {
  try {
    res.json('all good with users');
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", isAuthenticated, async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.userId)) {
        res.status(500).json("Invalid Id");
      } else {
        const userData = await User.findById(req.params.userId);
  
        res.json(userData);
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
