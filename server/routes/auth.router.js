const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();
const saltRounds = 10;

// POST  /auth/signup
// ...
router.post("/signup", (req, res, next) => {
	console.log("got to sign up route");
	console.log("got body", req.body);
	const { email, password, name } = req.body;
	console.log(email, password, name);
	// Check if the email or password or name is provided as an empty string
	if (email === "" || password === "" || name === "") {
		res.status(400).json({ message: "Provide email, password and name" });
		return;
	}

	const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
	if (!emailRegex.test(email)) {
		res.status(400).json({ message: "email must be a valid email" });
		return;
	}

	const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/);
	if (!passwordRegex.test(password)) {
		res.status(400).json({
			message:
				"Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
		});
		return;
	}

	User.findOne({ email })
		.then((foundUser) => {
			// If the user with the same email already exists, send an error response
			if (foundUser) {
				res.status(400).json({ message: "User already exists." });
				return;
			}

			// If the email is unique, proceed to hash the password
			const salt = bcrypt.genSaltSync(saltRounds);
			const hashedPassword = bcrypt.hashSync(password, salt);

			// Create a new user in the database
			// We return a pending promise, which allows us to chain another `then`
			return User.create({ email, password: hashedPassword, name });
		})
		.then((createdUser) => {
			// Deconstruct the newly created user object to omit the password
			// We should never expose passwords publicly
			const { email, name, _id } = createdUser;

			// Create a new object that doesn't expose the password
			const user = { email, name, _id };

			// Send a json response containing the user object
			res.status(201).json({ user: user });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "Internal Server Error" });
		});
});

// POST  /auth/login
// ...
router.post("/login", (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ message: "please provide your email and password" });
		return;
	}

	User.findOne({ email })
		.then((foundUser) => {
			if (!foundUser) {
				res.status(401).json({ message: "nope" });
				return;
			}

			const isPasswordCorrect = bcrypt.compareSync(
				password,
				foundUser.password,
			);

			if (isPasswordCorrect) {
				const { _id, email, name } = foundUser;

				const payload = { _id, email, name };

				const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
					algorithm: "HS256",
					expiresIn: "6h",
				});

				res.status(200).json({ authToken });
			} else {
				res.status(401).json({ message: "nope" });
			}
		})
		.catch((err) => {
			next(err);
		});
});

// GET  /auth/verify
// ...
const { isAuthenticated } = require("../middleware/auth.js");

router.get("/verify", isAuthenticated, (req, res, next) => {
	console.log("req.headers", req.headers);
	console.log("payload", req.payload);
	const { _id, name, email } = req.payload;

	res.status(200).json({ _id, name, email });
});
module.exports = router;
