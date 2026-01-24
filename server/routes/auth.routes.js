const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const saltRounds = 10;



router.post("/signup", async (req, res) => {
    console.log("REQ BODY:", req.body);
   
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Provide email, password and name"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Provide a valid email address."
      });
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."
      });
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({
        message: "User already exists."
      });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      name
    });

    res.status(201).json({
      user: {
        _id: createdUser._id,
        email: createdUser.email,
        name: createdUser.name
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Provide email and password."
    });
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(401).json({
      message: "User not found."
    });
  }

  const passwordCorrect = bcrypt.compareSync(
    password,
    foundUser.password
  );

  if (!passwordCorrect) {
    return res.status(401).json({
      message: "Unable to authenticate the user"
    });
  }

  const payload = {
    _id: foundUser._id,
    email: foundUser.email,
    name: foundUser.name
  };

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: "HS256", expiresIn: "6h" }
  );

  res.status(200).json({ authToken });
});

// VERIFY
router.get("/verify", isAuthenticated, (req, res) => {
  res.json(req.payload);
});



module.exports = router;
