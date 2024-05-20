const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


const router = express.Router();
const saltRounds = 10;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  if (!PASSWORD_REGEX.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If the email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ email, password: hashedPassword, name }); //  pending promise
    })
    .then((createdUser) => {
      const { email, name, _id } = createdUser;
      const user = { email, name, _id }; // Create a new object that doesn't expose the password

      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  console.log("email", email);

  User.findOne({ "email": email })
    .then((foundUser) => {

      
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }

      console.log("foundUser", foundUser);

      if (bcrypt.compareSync(password, foundUser.password)) {
        const { _id, email, name } = foundUser; // Deconstruct the user object to omit the password

        const payload = { _id, email, name };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error!" }));
});

// ...

// GET  /auth/verify
router.get('/verify', isAuthenticated, (req, res, next) => {       // <== CREATE NEW ROUTE
 
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);
 
  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});
module.exports = router;
