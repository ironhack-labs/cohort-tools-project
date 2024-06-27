const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.model.js");
const isAuth = require("../middleware/jwt.middleware.js");
const router = express.Router();

const salts = 10;

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body)
    const { email, username, password } = req.body;
    // Check if req.body has all info (email, username, password)
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "Please provide email, username, and password" });
    }

    // Try to find a user in database through email or username provided

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });
    // If it finds a user, they already exist
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Regex to validate email (checks if theres word@word.com format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    // Use regex to validate the password format
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 8 characters and contain at least one number, one lowercase, one uppercase letter and a special character.",
      });
      return;
    }

    const salt = await bcrypt.genSalt(salts);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!(email || username) || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email or username, and password" });
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password)
    if (!passwordCheck) {
      return res
        .status(401)
        .json({ message: "Email/Username or password incorrect" });
    }
    delete user._doc.password;
    const jwtToken = jwt.sign(
      {
        payload: { user, customProp: "Alejandro, Victor and Abner were here" },
      },
      process.env.TOKEN_SIGN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "24h",
      }
    );
    res.json({ user, authToken: jwtToken });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Please provide email or username, and password" });
  }
});

router.get("/verify", isAuth, async (req, res) => {
  try {
    console.log("Hello, this is the logged user in verify ->", req.user);
    res.json({ message: "User is logged in.", user: req.user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
