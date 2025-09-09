const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const validateToken = require("../middlewares/auth.middleware");

// POST /auth/signup - Creates a new user in the database
router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    console.log(foundUser);
    if (foundUser !== null) {
      res.json({
        errorMessage: "There is a user already registered with that email",
      });

      return;
    }

    const hashPassword= await bcrypt.hash (password, 12)

    await User.create ({
        email,
        password: hashPassword,
        name

    })
    res.sendStatus(201)

  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /auth/login - Checks the sent email and password and, if email and password are correct returns a JWT
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  // Check if email and password is not empty
  if (!email || !password) {
    res.status(400).json({errorMessage: "The email and password should not be empty"})
    return;
  }
  
  try {
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      res.status(401).json({ errorMessage: "The user doesn't exist" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ errorMessage: "Incorrect password" });
      return;
    }

    const payload = { _id: foundUser._id, name: foundUser.name, email: foundUser.email };
    const authToken = jwt.sign( payload, `${process.env.TOKEN_SECRET_KEY}`, { algorithm: "HS256", expiresIn: "10m"})
    
    res.status(202).json({ authToken });
  } catch (error) {
    console.log(error)
    next(error);
  }
});

// GET /auth/verify - Verifies that the JWT sent by the client is valid
router.get("/verify", validateToken, (req, res) => {
  console.log("VERIFY:", req.payload);
  res.status(200).json(req.payload);
});

module.exports = router