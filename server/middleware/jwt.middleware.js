const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token using the secret key
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    
    // Attach the payload to the request object
    req.payload = payload;

    // Move to the next middleware or route
    next();
    
  } catch (error) {
    // Handle invalid or missing tokens
    res.status(401).json({ message: "Token not provided or invalid" });
  }
};

module.exports = { isAuthenticated };