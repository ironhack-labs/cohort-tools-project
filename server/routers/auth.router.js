// ! modules
const Auth = require("express").Router();

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

module.exports = Auth;
