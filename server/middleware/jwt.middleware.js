const jwt = require("jsonwebtoken");
const CustomError = require("../error-handling/CustomError");

// Middleware to authenticate JWT tokens in incoming requests

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new CustomError("No token provided", 401));
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new CustomError("Token missing", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(new CustomError("Token expired", 401));
      }
      return next(new CustomError("Invalid token", 401));
    }
    req.auth = decoded;
    next();
  });
};

module.exports = authenticate;
