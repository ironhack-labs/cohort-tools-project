require("dotenv").config();

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({ message: "You need to provide name, email and password" });
    return;
  }

  // Verifying user existence
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User exists already" });
    return; // Add a return here to prevent further execution
  }

  // Adding a user
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  const createdUser = await User.create(newUser);
  res.status(201).json({
    name: createdUser.name,
    email: createdUser.email,
    id: createdUser._id,
  });
});

// Logging a user
router.post("/login", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({ message: "You need to provide name, email and password" });
    return;
  }

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    res.status(400).json({ message: "Couldn't find user" });
    return;
  }

  // Checking password
  const correctPassword = await bcrypt.compare(password, foundUser.password);

  // Incorrect Password
  if (!correctPassword) {
    res.status(400).json({ message: "Incorrect password" });
    return;
  }

  // Generating a token (in case password is correct)
  const payload = {
    id: foundUser._id,
    name: foundUser.name,
    email: foundUser.email,
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "5h",
    algorithm: "HS256",
  });

  res.send({ authToken: token });
});

// GET /auth/verify - Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

module.exports = router;
