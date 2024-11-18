const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { isAuthenticated } = require("../middleware/jwt");
const User = require("../models/User.model");
const router = express.Router();
const saltRounds = 10;

// POST /auth/signup
router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  // Check if the email/password/name is provided
  if (!email || !password || !name) {
    res
      .status(400)
      .json({ message: "Please provide an email, password, and name" });
    return;
  }

  // Use regex for email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // Regex password validation
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res
      .status(400)
      .json({
        message:
          "Provide a valid password with at least 6 characters, one lowercase and one uppdercase leter, and one number",
      });
    return;
  }

  //Check if user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      // Error message for already existing user
      if (foundUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      // Hash the unique password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // New user model
      const newUser = {
        email,
        password: hashedPassword,
        name,
      };

      // Create new user in the database
      return User.create(newUser);
    })
    .then((createdUser) => {
      // Deconstructing newly created user object to omit the password
      const { email, name, _id } = createdUser;

      // Creating a new object that won't expose the password
      const user = { email, name, _id };

      // json response with user object
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.log("There is an error creating an account", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// POST /auth/login
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password has been provided as an empty string
  if (!email || !password) {
    res.status(400).json({ message: "Provide a valid email and password" });
    return;
  }

  // Check the users collection for a user with the same email
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        //If not found, sends an error
        res.status(401).json({ message: "User not found" });
        return;
      }

      // Compares provided password with one saved in database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstructs user object to omit password
        const { _id, email, name } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name };

        // Creates + signs the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as a response
        res.json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
        return;
      }
    })
    .catch((err) => {
      console.log("Error trying to login", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// GET /auth/verify
router.get('/verify', isAuthenticated, (req, res, next) => {

    // If JWT token is valid, the payload is decoded by isAuthenticated middleware & made available on req.payload
    console.log('req.payload', req.payload);

    // Sends back the user data object previously set as the token payload
    res.json(req.payload)
})

module.exports = router;