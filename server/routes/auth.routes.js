const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/auth.middleware");

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const foundUser = await UserModel.findOne({ email });
        if (foundUser) {
            res.status(403).json({ message: "email already taken" });
        } else {
          const theSalt = bcryptjs.genSaltSync(10);
          const hashedPassword = bcryptjs.hashSync(password, theSalt);

          const createdUser = await UserModel.create({
            ...req.body,
            password: hashedPassword,
          });
          res.status(200).json({ message: "signup successful", user: createdUser });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await UserModel.findOne({ email });
        if (!foundUser) {
            res.status(403).json({ message: "Invalids Credentials" });
        } else {
          foundUser.password = "****";
          
          const tokenCheck = process.env.TOKEN_SECRET;
          console.log("Token Secret:", tokenCheck);

            const authToken = jwt.sign(
                {_id: foundUser._id, name: foundUser.name },
                process.env.TOKEN_SECRET,
                {
                    algorithm: "HS256",
                    expiresIn: "48h",
                }
            );
            console.log("here is the authToken", authToken);
            res.status(200).json({ message: "login successful", authToken });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get("/verify", isAuthenticated, (req, res) => {
    console.log("made it to the verify route", req.payload );
    res.status(200).json({ currentUser: req.payload });
});

module.exports =  router;