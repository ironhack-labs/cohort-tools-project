const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/signup", async (req, res, next) => {
  // // Use regex to validate the email format
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // if (!emailRegex.test(req.body.email)) {
  //   res.status(400).json({ message: "Provide a valid email address." });
  //   return;
  // }

  // // Use regex to validate the password format
  // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  // if (!passwordRegex.test(req.body.password)) {
  //   res
  //     .status(400)
  //     .json({
  //       message:
  //         "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.", // ex: 123456lL
  //     });
  //   return;
  // }

  try {
    const foundUser = await User.findOne({
      $or: [{ username: req.body.name }, { email: req.body.email }],
    });
    if (foundUser) {
      res.status(500).json({
        errorMessage: "Please pick unique username and email",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const userToCreate = {
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      };
      const createdUser = await User.create(
        userToCreate
      );

      console.log("User created", createdUser);
      res.status(201).json(createdUser); 
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      if (passwordMatch) {
        const loggedInUser = {
          _id: foundUser._id,
          username: foundUser.username,
        };

        const authToken = jwt.sign(
          loggedInUser, 
          process.env.TOKEN_SECRET,
          { algorithm: "HS256", expiresIn: "6h" }
        );

        res.status(200).json({ message: "Login successful", authToken }); // do not send user to FE, not secure
      } else {
        res.status(500).json({
          errorMessage: "Invalid password",
        });
      }
    } else {
      res.status(500).json({
        errorMessage: "Invalid email",
      });
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  if (req.payload) {
    res
      .status(200)
      .json({ message: "Valid authentication token", user: req.payload });
  } else {
    res.status(401).json({ message: "Invalid headers" });
  }
});

module.exports = router;