
const jwt = require("jsonwebtoken");

// Instantiate the JWT token validation middleware
const isAuthenticated = (req, res, next) => {
    try {
        // Get the token string from the authorization header - "Bearer eyJh5kp9..."
        const token = req.headers.authorization.split(" ")[1];

        // Verify the token
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);

        // Add payload to request object for use in next middleware or route
        req.payload = payload;

        // Pass to next middleware or route
        next();
    } catch (error) {
        // Return 401 if token is invalid or missing
        res.status(401).json("token not provided or not valid");
    }
}

module.exports = {
    isAuthenticated
}