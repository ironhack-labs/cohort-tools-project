const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const secret = process.env.JWT_SECRET || "ton_secret_dev";

// Middleware pour extraire et valider le token JWT
const requireAuth = expressJwt({
    secret,
    algorithms: ["HS256"],
    requestProperty: "auth" // met le payload JWT dans req.auth
});

// Middleware pour signer un token
function signToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email },
        secret,
        { expiresIn: "7d" }
    );
}

module.exports = { requireAuth, signToken };
