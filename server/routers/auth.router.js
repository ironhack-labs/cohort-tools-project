// ! modules
const Auth = require("express").Router();
const userSchema = require("../models/user");
const mongoose = require("mongoose");

// * controllers
// ? auth
const { auth } = require("./../Controllers/auth");

// ? middlewares
const authMiddleware = require("./../middlewares/auth");

// ? POST

// Creates a new user in the database
Auth.post("/signup", auth.signup);

// Checks the sent email and password and, if email and password are correct returns a JWT
Auth.post("/login", auth.login);

// ? GET
// Verifies that the JWT sent by the client is valid
Auth.get("/verify", authMiddleware, auth.verify);

//Retrieves a specific user by id. The route should be protected by the authentication middleware.
Auth.get("/api/users/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findById(id);
    res.json(user);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = Auth;
