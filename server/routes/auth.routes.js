const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const isAuthenticated = require("../middleware/jwt.middleware");

router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Provide email, password and name" });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must have at least 6 characters",
    });
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({
        email,
        password: hashedPassword,
        name,
      });
    })
    .then((createdUser) => {
      if (!createdUser) return;

      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: createdUser._id,
          email: createdUser.email,
          name: createdUser.name,
        },
      });
    })
    .catch((error) => next(error));
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Provide email and password" });
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (!passwordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
      };

      const authToken = jwt.sign(payload, "1r0Nh4cK", {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      res.status(200).json({ authToken });
    })
    .catch((error) => next(error));
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

module.exports = router;