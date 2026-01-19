const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middleware");
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userAlreadyInDB = await UserModel.findOne({ email });
    if (userAlreadyInDB) {
      res.status(403).json({ errorMessage: "Email already taken" });
    } else {
      const theSalt = bcryptjs.genSaltSync(12);
      const theHashedPassword = bcryptjs.hashSync(password, theSalt);
      const hashedUser = {
        ...req.body,
        password: theHashedPassword,
      };
      const createdUser = await UserModel.create(hashedUser);
      res.status(201).json(createdUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAlreadyInDB = await UserModel.findOne({ email });
    if (!userAlreadyInDB) {
      res.status(403).json({ errorMessage: "Email no in DB" });
    } else {
      const doesPasswordsMatch = bcryptjs.compareSync(
        password,
        userAlreadyInDB.password
      );
      if (!doesPasswordsMatch) {
        res.status(403).json({ errorMessage: "Incorrect Password" });
      } else {
        const payLoad = { _id: userAlreadyInDB._id };
        const authToken = jwt.sign(payLoad, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res
          .status(200)
          .json({ errorMessage: "you are now logged in", authToken });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error });
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

module.exports = router;
