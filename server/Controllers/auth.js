// ! modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
// ? models
const userSchema = require("./../models/user");

class Auth {
  constructor() {
    this.key = "secret-key";

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.verify = this.verify.bind(this);
  }

  // create a new one user
  async signup(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const user = await userSchema.findOne({ email });
      if (user) {
        res.json({ msg: "user already exists" });
      }
      const hashedPass = await bcrypt.hash(password, 10);

      const newUser = await userSchema.create({
        email,
        name,
        password: hashedPass,
      });
      res.json({
        msg: "new user created",
        username: newUser.name,
        email: newUser.email,
      });
    } catch (err) {
      next(err);
    }
  }

  // login
  async login(req, res, next) {
    try {
      const isUserInDb = await userSchema.findOne({ email: req.body.email });
      if (!isUserInDb) {
        throw new Error("user not found");
      }
      const isPassOk = await bcrypt.compare(
        req.body.password,
        isUserInDb.password
      );

      if (!isPassOk) {
        console.log("Password is incorrect!");
        throw new Error("Password is not valid");
      }
      console.log("Password is correct!");
      const token = jwt.sign({ _id: isUserInDb._id }, this.key, {
        expiresIn: "3hr",
      });
      res.status(200).json({ token: token });
    } catch (err) {
      throw new Error(err);
    }
  }

  // verify token
  async verify(req, res, next) {
    try {
      const { token } = req.headers.authorization;

      if (!token) {
        throw new Error("User must have a token");
      }
      const payload = jwt.verify(token, this.key);
      if (!payload) {
        res.json({ msg: "must have valid token" });
      }
      res.status(200).send({ data: payload });
    } catch (err) {
      next(err);
    }
  }
}

const auth = new Auth();

module.exports = { auth };
