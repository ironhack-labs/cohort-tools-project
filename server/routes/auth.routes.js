const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

//route to create a new user with an encrypted password
router.post("/signup", async (req, res) => {
  try {
    //first thing is to create a salt
    const theSalt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(req.body.password, theSalt);
    //longer version
    // const hashedUser = {
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: hashedPassword,
    // };
    const createdUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//route to login a existing user
router.post("/login", async (req, res) => {
  try {
    const foundUserInDB = await UserModel.findOne({ email: req.body.email });
    if (!foundUserInDB) {
      res.status(400).json({ errorMessage: "Email does not exist" });
    } else {
      const doesPasswordMatch = bcryptjs.compareSync(
        req.body.password,
        foundUserInDB.password
      );
      if (!doesPasswordMatch) {
        res.status(403).json({ errorMessage: "Password does not match" });
      } else {
        //this is the if state for when email exist and password matches
        const data = {
          _id: foundUserInDB._id,
          username: foundUserInDB.username,
        };
        //creating the JWT token
        const authToken = jwt.sign(data, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res
          .status(200)
          .json({ message: "You logged in! Nice work", authToken });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//verify route to check if the token is valid
router.get("/verify", isAuthenticated, (req, res) => {
  if (req.payload) {
    res.status(200).json(req.payload);
  } else {
    res.status(400).json({ errorMessage: "Problem with payload" });
  }
});

module.exports = router;