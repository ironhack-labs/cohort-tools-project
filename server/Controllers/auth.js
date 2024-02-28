// ! modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
      bcrypt.hash(req.body.password, 10).then(async (hash) => {
        await userSchema
          .create({
            email: req.body.email,
            name: req.body.name,
            password: hash,
          })
          .then((result) => {
            res.status(201).send({ data: result });
          });
      });
    } catch (err) {
      next(err);
    }
  }

  // login
  async login(req, res, next) {
    try {
      await userSchema
        .findOne({ email: req.body.email })
        .orFail(() => {
          throw new Error("User not found");
        })
        .then((result) => {
          bcrypt
            .compare(req.body.password, result.password)
            .then((isPassOk) => {
              if (isPassOk) {
                console.log("Password is correct!");
                const token = jwt.sign({ _id: result._id }, this.key);
                res.status(200).send({ token: token });
              } else {
                console.log("Password is incorrect!");
                throw new Error("Password is not valid");
              }
            });
        })
        .catch(next);
    } catch (err) {
      next(err);
    }
  }

  // verify token
  async verify(req, res, next) {
    try {
      const { token } = req.headers;

      if (!token) {
        throw new Error("User must have a token");
      }

      let payload;

      try {
        payload = jwt.verify(token, this.key);
      } catch (error) {
        throw new Error("User is not authorized");
      }

      res.status(200).send({ data: payload });
    } catch (err) {
      next(err);
    }
  }
}

const auth = new Auth();

module.exports = { auth };
