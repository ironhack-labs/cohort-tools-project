const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "No token found in the headers" });
    }
    token = token.split(" ")[1];

    const decryptedToken = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    req.currentUserId = decryptedToken.id;
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = isAuthenticated;
