const bcrypt = require('bcrypt');

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = bcrypt.compare(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
