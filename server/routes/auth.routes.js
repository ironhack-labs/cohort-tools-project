// POST /auth/signup - Creates a new user in the database

// POST /auth/login - Checks the sent email and password and, if email and password are correct returns a JWT

// GET /auth/verify - Verifies that the JWT sent by the client is valid

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const isAuthenticated = require("../models/middleware/authMiddleware");
require("dotenv").config();

router.post("/signup", (req, res) => {
  const { email, password, name } = req.body;

  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
  User.findOne({ email })
    .then((user) => {
      if (user)
        return res.status(400).json({ message: "email already exists" });

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ email, password: hashedPassword, name });
    })
    .then((user) => res.json(user))
    .catch((err) => console.error(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });

      const passwordCorrect = bcrypt.compareSync(password, user.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = user;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name };
        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal  Error" });
    });
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // <== CREATE NEW ROUTE

  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

module.exports = router;
