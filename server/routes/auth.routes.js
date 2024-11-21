const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { verifyJWT } = require("../middleware/verify.jwt");

const authRouter = express.Router();
const saltRounds = 10;

// POST  /auth/signup
authRouter.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      console.log(foundUser);
      res.status(400).json({ message: "User already exists." });
      return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const createdUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).json({ error: "server error" });
  }
});
// ...

// POST  /auth/login
authRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ message: "wrong credentials." });
      return;
    }

    const isPasswordMatch = bcrypt.compareSync(password, foundUser.password);
    if (!isPasswordMatch) {
      res.status(400).json({ message: "wrong credentials." });
      return;
    }
    const { _id, name } = foundUser;
    const payload = { _id, email, name };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.status(200).json({ authToken: authToken });
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).json({ error: "server error" });
  }
});
// ...

// GET  /auth/verify
authRouter.get("/verify", verifyJWT, (req, res, next) => {
  res.status(200).json({ loggedIn: true });
});

// ...

module.exports = authRouter;
