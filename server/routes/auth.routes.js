const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/User.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

const router = express.Router();
const saltRounds = 10;

router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, name, password" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (emailRegex.test(email) === false) {
    res.status(400).json({ message: "Provide a valid email address" });
    return;
  }

  User.findOne({ email: email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already existing" });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return User.create({
        email: email,
        password: hashedPassword,
        name: name,
      });
    })
    .then((createdUser) => {
      const { email, name, _id } = createdUser;
      const user = { email, name, _id };
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  User.findOne({ email: email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      if (passwordCorrect) {
        const { email, name, _id } = foundUser;

        const user = { email, name, _id };
        const authToken = jwt.sign(user, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "90d",
        });

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(400).json({ message: "Unable to authorize the user" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router;
