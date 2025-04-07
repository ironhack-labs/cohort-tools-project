const { isAuthenticated } = require("../middlewares/jwt.middleware.js");
const Cohort = require("../models/Cohort.model.js");
const Student = require("../models/Student.model.js");
const UserModel = require("../models/User.model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const mySalt = bcryptjs.genSaltSync(12);
  const hashedPassword = bcryptjs.hashSync(password, mySalt);
  console.log({ mySalt, hashedPassword, password }); //remember to delete
  const hashedUser = {
    name,
    email,
    password: hashedPassword,
  };

  UserModel.create(hashedUser)
    .then((createdUser) => {
      console.log(createdUser); //remember to delete
      const userInDB = createdUser;
      userInDB.password = "------";
      res.status(201).json(userInDB);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error white creating user" });
    });
});

router.post("/login", (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (foundUser) {
        console.log("the user was found, ", foundUser);
        const doesPasswordMatch = bcryptjs.compareSync(
          req.body.password,
          foundUser.password
        );
        if (doesPasswordMatch) {
          const theData = { _id: foundUser._id, username: foundUser.username };
          const authToken = jwt.sign(theData, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "24h",
          });

          res
            .status(200)
            .json({ message: "You are logged in now!", authToken });
        } else {
          res.status(400).json({ errorMessage: "incorrect passsword" });
        }
      } else {
        res.status(400).json({ message: "Email doesn't exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Problem logging in user" });
    });
});

//verify route to check the token
router.get("/verify", isAuthenticated, (req, res) => {
  console.log("Here is the payload:", req.payload);
  res
    .status(200)
    .json({ message: "You are still logged in", payload: req.payload });
});
module.exports = router;
