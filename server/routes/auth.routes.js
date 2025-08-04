const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const User = require("../models/User.model.js");

const router = express.Router();

const saltRounds = 10;

//signup POST request

router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res
      .status(400)
      .json({ message: "Please provide email, password and name" });
    return;
  }

  //REGEx to check password validity
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: "Invalid password" });
    return;
  }

  //Regex for password check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email" });
    return;
  }

  //check if user exists already
  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      //if email is unique hash the pswd

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = {
        email: email,
        password: hashedPassword,
        name: name,
      };

      //create new user

      return User.create(newUser);
    })

    .then((createdUser) => {
      //deconstruct the new user object to omit the pswd

      const { email, name, _id } = createdUser;

      const user = { email, name, _id };

      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.log("Error trying to create an account...\n\n", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

//login
router.post("/login", (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).json({message: "Provide email and password"})
        return;
    }

    User.findOne({email})
    .then((foundUser) => {
        
        if(!foundUser) {
            res.status(401).json({ message: "User not found." });
            return;
        }

        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

        if(passwordCorrect) {
            const { _id, email, name } = foundUser

            const payload = { _id, email, name }

            const authToken = JsonWebTokenError.sign(payload, process.env.TOKEN_SECRET,  { algorithm: 'HS256', expiresIn: "6h" })

            res.json({ authToken: authToken })
        }
        else {
            res.status(401).json({ message: "Unable to authenticate the user" });
            return;
        }
    })
    .catch(err => {
      console.log("Error trying to login...\n\n", err);
      res.status(500).json({ message: "Internal Server Error" })
    })
})


router.get('/verify', isAuthenticated, (req, res, next) => {

  console.log(`req.payload`, req.payload);
 

  res.json(req.payload);
});



module.exports = router;
