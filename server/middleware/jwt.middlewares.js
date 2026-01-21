const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const parts = req.headers.authorization.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid authorization format" });
  }
  const token = parts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { isAuthenticated };
