// GET /api/users/:id - Retrieves a specific user by id. The route should be protected by the authentication middleware.

const router = require("express").Router();
const User = require("../models/users.model");

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.error(err));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
