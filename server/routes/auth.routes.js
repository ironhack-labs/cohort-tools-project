const router = require("express").Router();
const mongoose = require("mongoose");

// Encryption for password
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const bcrypt = require("bcryptjs/dist/bcrypt");

// POST /auth/signup
router.post("/signup", (req, res, next) => {
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
        const {email, name, _id} = createdUser;
        const user = { email, name, _id}
      res.status(201).json({user: user});
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "internal server error" });
    });
});

// POST /auth/login

// GET /auth/verify

// GET /api/users/:id

module.exports = router;
