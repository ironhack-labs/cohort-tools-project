const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  try {
    const authToken = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(authToken, `${process.env.TOKEN_SECRET_KEY}`)
    req.payload = payload;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ errorMessage: "Token invalid" });
  }
}

module.exports = validateToken;

