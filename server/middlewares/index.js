const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    // Get the token string from the authorization header - "Bearer eyJh5kp9..."
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.payload = payload;
    next();

  } catch (error) {
    res.status(401).json("token not provided or not valid");
  }
}
module.exports = {
  isAuthenticated
}
