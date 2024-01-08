const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const isAuthenticated = require("./middleware/isAuthenticated");

const saltRounds = 10;

// Signup
router.post("/signup", (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: "Invalid email, password, or name" });
    return;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({ email, password: hashedPassword, name })
        .then((createdUser) => {
          const { email, name, _id } = createdUser;
          const user = { email, name, _id };
          res.status(201).json(user);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Internal Server Error" });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "Incorrect Email or Password" });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, name } = foundUser;
        const payload = { _id, email, name };
        const authToken = jwt.sign(payload, process.env.SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({ authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate user" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: "Internal Server Error" });
    });
});

// Verify
router.get("/verify", isAuthenticated, (req, res) => {
  console.log("req.user ->", req.user);
  res.status(200).json(req.user);
});

module.exports = router;
