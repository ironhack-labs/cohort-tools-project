const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

const SALT = 10;

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const foundUser = await User.findOne({ email });
    // if email already exists in db, warn user
    if (foundUser) {
      return res.status(400).json({ message: "This email is already used" });
    }

    // if email doesn't exist, proceed

    const hashedPassword = await bcrypt.hash(password, SALT);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    res.status(201).json({
      message: "User created",
      id: createdUser._id,
    });
  } catch (error) {
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }, { password: 1, email: 1 });
    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const correctPassword = await bcrypt.compare(password, foundUser.password);

    if (!correctPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
    res.json({ authToken: token });
  } catch (error) {
    next(error);
  }
});
router.get("/verify", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.currentUserId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
