const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    res.status(400).json({ errorMessage: "both email and password are mandatory" });
    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "password not strong enough. needs at least 8 characters, one uppercase, one lowercase and one number",
    });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(400).json({ errorMessage: "User already exists with this email" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      email: email,
      password: hashedPassword,
      name: name,
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ errorMessage: "both email and password are mandatory" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(401).json({ errorMessage: "User not found" });
      return;
    }

    const passwordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!passwordCorrect) {
      res.status(401).json({ errorMessage: "Invalid password" });
      return;
    }

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ authToken, payload });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({ payload: req.payload });
});

router.get("/users/:userId", verifyToken, (req, res, next) => {
  User.findById(req.params.userId)
    .select("-password")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ errorMessage: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch(next);
});

module.exports = router;