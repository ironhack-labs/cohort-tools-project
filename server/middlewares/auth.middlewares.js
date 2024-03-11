const jwt = require("jsonwebtoken");

function isTokenValid(req, res, next) {
  try {
    //intentar recibir el token
    console.log(req.headers.authorization);

    //validar token
    const tokenArr = req.headers.authorization.split(" ");

    const token = tokenArr[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(payload)

    req.payload = payload; //dar acceso a cualquier ruta que use este middleware a saber QUIÉN está haciendo la llamada

    next(); //continúa con la ruta
  } catch (error) {
    res.status(401).json({ message: "Token no válido o expirado" });
  }
}

module.exports = { isTokenValid };
