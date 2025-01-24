const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /auth/signup - Crear un nuevo usuario
router.post('/signup', async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const secret = process.env.JWT_SECRET;
        const authToken = await bcrypt.hash(secret, 10)

        // Crear un nuevo usuario
        const newUser = new User({ email, password: hashedPassword, name });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', token: authToken });
    } catch (error) {
        next(error);
    }
});

// POST /auth/login - Iniciar sesión y devolver un JWT
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log(email, password)

        // Buscar el usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log(user)
        //
        // Comparar las contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log(isMatch)

        // Generar un token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'defaultSecret',
            { expiresIn: '1h' }
        );

        console.log(token)

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        next(error);
    }
});

// GET /auth/verify - Verificar si el token es válido
router.get('/verify', (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
        res.json({ user: decoded, message: 'Token is valid' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
});

module.exports = router;
