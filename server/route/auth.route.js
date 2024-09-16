const User = require("../models/User.model");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/route-gaurd");

router.post("/signup", async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const salt = bcryptjs.genSaltSync(13);
    const hashPassword = bcryptjs.hashSync(password, salt);
    const userData = await User.create({ email, name, hashPassword });
    res.status(201).json({ email: userData.email, name: userData.name, id: userData._id });
  } catch (error) {
    console.error("Error while signing up user: ", email);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ email: email });
    if (userData && bcryptjs.compareSync(password, userData.hashPassword)) {
      const token = jwt.sign({ id: userData._id }, process.env.SECRET_KEY, { algorithm: "HS256", expiresIn: "1h" });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Email or password is incorrect." });
    }
  } catch (error) {
    console.error("Error while logging user: ", email);
    next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.json({ user: req.payload });
})

module.exports = router;