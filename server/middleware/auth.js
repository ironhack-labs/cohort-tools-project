const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt"); // :white_check_mark: CORREGIDO
const secret = process.env.JWT_SECRET || "supersecret_jwt_key"; // usa variable de entorno en producción
// Middleware para proteger rutas y decodificar el token
const authenticate = expressJwt({
  secret,
  algorithms: ["HS256"],
  requestProperty: "auth", // El usuario estará disponible en req.auth
});
// Función para firmar (crear) un token JWT para un usuario
function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email }, // payload del token
    secret,                              // clave secreta para firmarlo
    { expiresIn: "1d" }                  // duración del token: 1 día
  );
}
module.exports = { authenticate, signToken };






