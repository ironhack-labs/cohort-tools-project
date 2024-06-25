const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("./models/userModel");
const bcrypt = require('bcryptjs'); //For encrypting
const jwt = require("jsonwebtoken"); // For the Token
const saltRounds = 10;
const {isAuthenticated} = require("./middleware/jwt.middleware")

/* mongoose
  .connect("mongodb://127.0.0.1:27017/*change this*")
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));
 */

  router.get("/verify", isAuthenticated, (req, res) => {
    res.status(200).json(req.payload);
  
  })

  router.post("/signup", (req, res) => {
  
  const {name, email, password} = req.body
   
  if ( email === "" || name === "" || password === "" ) {
   res.status(400).json({message: "Please introduce valid credentials"})
   return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }
  
  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  //Checking if a user with the same email exists: 
  User.findOne( {email})
  .then( (foundUser) => {

    if (foundUser) {
      res.status(400).json({ message: "User already exists." });
      return;
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userObject = {
      email,
      name,
      password: hashedPassword
    }

    return User.create(userObject);
  })
  .then((createdUser) => {
    const { email, name, _id } = createdUser;
    const user = { email, name, _id };
    res.status(201).json({ user: user });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" })
  });
  });

  router.post("/login", (req, res) => {
    const {email, password} = req.body;
   
    // Pre validation
    if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
    }

    User.findOne({email})
      .then( userFound => {

        if (!userFound) {
          res.status(400).json({message: "User does not exist"})
          return
        }
        const passwordCorrect = bcrypt.compareSync(password, userFound.password);

        if (passwordCorrect ) {
          const { _id, email, name } = userFound;
          console.log("The password was correct ")
        // Create an object that will be set as the token payload
        const payload = { _id, email, name };
 
        // Create and sign the token
        const authToken = jwt.sign( 
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
          );
 
        // Send the token as the response
        console.log("We are going to send this token:", authToken)

        res.status(200).json({ authToken: authToken });
        return
        }
        else {
        res.status(401).json({message: "incorrect password"})
        return
       }

      })
      .catch( error => {
        res.json( {message: "Email not found", error})
      })

  });


  module.exports = router;