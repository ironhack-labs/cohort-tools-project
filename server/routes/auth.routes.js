const router = require("express").Router();
const mongoose = require("mongoose");

// Encryption for password
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const User = require("../models/User.model");
const bcrypt = require("bcryptjs/dist/bcrypt");

const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST /auth/signup
router.post("/auth/signup", (req, res, next) => {
  const { email, name, password } = req.body;

  //check if email, password, name is provided
  if (email === "" || name === "" || password === "") {
    res.status(400).json({ message: "Please provide email, password, name" });
    return;
  }

  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // check if user already exists

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      // salt
      const salt = bcryptjs.genSaltSync(10);

      // hashed Password
      const hashedPassword = bcryptjs.hashSync(password, salt);

      // create user
      const newUser = {
        email: email,
        name: name,
        password: hashedPassword,
      };

      return User.create(newUser);
    })
    .then((createdUser) => {
      const { email, name, _id } = createdUser;
      const user = { email, name, _id };
      res.status(201).json({ user: user });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "internal server error" });
    });
});

// POST /auth/login
router.post("/auth/login", (req, res, next) => {
  const { password, email } = req.body;

  //check if email, password, name is provided
  if (email === "" || password === "") {
    res.status(400).json({ message: "Please provide email, password" });
    return;
  }

  // go find user in DB
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      // Compare the password whit the saved on dataBase
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      if (passwordCorrect) {
        const { _id, email, name } = foundUser;

        const payload = { _id, email, name };

        const authToke = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.json({ authToke: authToke });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "internal server error" });
    });
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/auth/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

// GET /api/users/:id
router.get("/api/users/:id", isAuthenticated, (req, res, next) => {

  const userId = req.params.id;

  User.findOne({ _id: userId })
    .then((userRes) => {
        const {_id, name, email} = userRes

        const user = {_id, name, email}

        res.status(200).json(user)
    })
    .catch((err) => {
        res.status(500).json(err)
    });
});

module.exports = router;
