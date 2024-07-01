const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = 1;
const User = require("./../models/User.models");
const isAuth = require("./../middleware/isAuthenticated");
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "email, name, password are mandatory" });
    }

    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res
        .status(400)
        .json({ message: `This ${email} is already taken` });
    }
    const hashedPassword = await bcrypt.hash(password, SALT);

    const createUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    res.status(201).json({
      message: `Created user ${createUser.name} with id ${createUser.email}`,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "need some onformation" });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: "wrong credentials" });
    }

    // const correctPassword = await bcrypt.compare(password, foundUser.password);
    // if (!correctPassword) {
    //   return res.status(400).json({ message: "wrong credentials" });
    // }

    const payload = { id: foundUser._id };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
      algorithm: "HS256",
    });

    res.json({ accessToken: token });
  } catch (error) {}
});

router.get("/verify", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
