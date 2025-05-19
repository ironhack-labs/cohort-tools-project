// routes/auth.routes.js

const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();
const saltRounds = 10;

router.post('/signup', (req, res, next) => {
    const { email, password, name } = req.body;

    if (email === '' || password === '' || name === '') {
        return res.status(400).json({ message: "Provide email, password and name" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Provide a valid email address.' });
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    }

    User.findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                // ✅ STOP the chain by throwing instead of returning nothing
                throw { status: 400, message: "User already exists." };
            }

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            return User.create({ email, password: hashedPassword, name });
        })
        .then((createdUser) => {
            if (!createdUser) {
                // ✅ Safety check before destructuring
                throw { status: 500, message: "Failed to create user." };
            }

            const { email, name, _id } = createdUser;
            res.status(201).json({ user: { email, name, _id } });
        })
        .catch(err => {
            console.error(err);
            if (res.headersSent) return;

            const status = err.status || 500;
            const message = err.message || "Internal Server Error";
            res.status(status).json({ message });
        });
});

// POST /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    // Check if email or password are provided as empty string 
    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    // Check the users collection if a user with the same email exists
    User.findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                // If the user is not found, send an error response
                res.status(401).json({ message: "User not found." })
                return;
            }

            // Compare the provided password with the one saved in the database
            const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

            if (passwordCorrect) {
                // Deconstruct the user object to omit the password
                const { _id, email, name } = foundUser;

                // Create an object that will be set as the token payload
                const payload = { _id, email, name };

                // Create and sign the token
                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                );

                // Send the token as the response
                res.status(200).json({ authToken: authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

// GET /auth/verify - Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and made available on `req.payload`
    console.log(`req.payload`, req.payload);

    // Send back the object with user data
    // previously set as the token payload
    res.status(200).json(req.payload);
});

module.exports = router;