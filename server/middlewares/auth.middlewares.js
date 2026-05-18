const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    console.log(req.headers);

    const authToken = req.headers.authorization.split(" ")[1];

    const payload = jwt.verify(authToken, process.env.TOKEN_SECRET);

    req.payload = payload;

    next();
  } catch (error) {
    res.status(401).json({ errorMessage: "Token not provided or not valid" });
  }
}

module.exports = verifyToken;
