const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function isAuthenticated(req, res, next) {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    // Attach the user payload to the request object
    req.payload = payload;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(401).json({ message: "Authentication failed" });
  }
}

module.exports = isAuthenticated;
