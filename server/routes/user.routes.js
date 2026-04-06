const router = require("express").Router();

const User = require("../models/User.model");
const isAuthenticated = require("../middleware/jwt.middleware");

router.get("/users/:id", isAuthenticated, (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((foundUser) => {
      if (!foundUser) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
      }

      res.json({
        _id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
      });
    })
    .catch((error) => next(error));
});

module.exports = router;