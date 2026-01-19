const router = require("express").Router();
const UserModel = require("../models/User.model");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const { error403Credentials } = require("../error-handling/errorHandling");

router.post("/signup", async (req, res, next) => {
  const allBody = req.body;
  const { email, password } = allBody;
  try {
    const isUserInDb = await UserModel.findOne({ email });
    if (isUserInDb) {
      error403Credentials(res);
      return;
    } else {
      const theSalt = bcryptjs.genSaltSync(12);
      const theHashedPassword = bcryptjs.hashSync(password, theSalt);
      const hashedUser = {
        ...allBody,
        password: theHashedPassword,
      };
      const createdTheUser = await UserModel.create(hashedUser);
      res.status(201).json({
        successMessages: `${createdTheUser} is created`,
        user: hashedUser,
      });
    }
  } catch (error) {
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const isUserInDb = await UserModel.findOne({ email });
  try {
    // A voir ici
    if (!isUserInDb) {
      error403Credentials(res);
      return;
    } else {
      const isPasswordMatch = bcryptjs.compareSync(
        password,
        isUserInDb.password,
      );
      if (!isPasswordMatch) {
        error403Credentials(res);
      } else {
        const payload = { _id: isUserInDb._id };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({
          successMessages: "You're now logged in, awesome job!",
          authToken,
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  res
    .status(200)
    .json({ message: "Token is valid :)", decodedToken: req.payload });
});

module.exports = router;
