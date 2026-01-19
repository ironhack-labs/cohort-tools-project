const jwt = require("jsonwebtoken");
require("dotenv").config();

function isAuthenticated(req, res, next) {
  const bearerExist = req.headers.authorization.split(" ")[0] === "Bearer";
  const tokenExist = req.headers.authorization.split(" ")[1];

  const isTokenExist = bearerExist && tokenExist;
  if (isTokenExist) {
    const theTokenInHeaders = tokenExist;
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
