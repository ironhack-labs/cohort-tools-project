const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  if (
    req.headers.authorization.split(" ")[0] === "Bearer" &&
    req.headers.authorization.split(" ")[1]
  ) {
    const theTokenInHeaders = req.headers.authorization.split(" ")[1];
    try {
      const decodedToken = jwt.verify(
        theTokenInHeaders,
        process.env.TOKEN_SECRET
      );
      req.payload = decodedToken;
      next();
    } catch (error) {
      res.status(403).json({ errorMessage: "Invalid Token" });
    }
  } else {
    res.status(403).json({ errorMessage: "Headers Malformed" });
  }
}

module.exports = { isAuthenticated };
