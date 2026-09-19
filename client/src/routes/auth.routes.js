const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const saltRounds = 10;
router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Proporciona email, contraseña y nombre" });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createdUser = await User.create({ email, password: hashedPassword, name });
    const userResponse = { email: createdUser.email, name: createdUser.name, _id: createdUser._id };
    res.status(201).json({ user: userResponse });
  } catch (err) {
    next(err);
  }
});
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Proporciona email y contraseña" });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }
    const payload = { _id: foundUser._id, email: foundUser.email, name: foundUser.name };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.status(200).json({ authToken: authToken });
  } catch (err) {
    next(err);
  }
});
router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router;