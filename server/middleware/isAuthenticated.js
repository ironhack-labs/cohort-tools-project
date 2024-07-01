const jwt = require("jsonwebtoken");

async function isAuth(req, res, next) {
  try {
    // console.log(req.headers)
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "No token found in the headers" });
    }
    token = token.split(" ")[1];
    // console.log(token)
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(decoded)
    //! most important line of code here
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token", error: error });
  }
}

module.exports = isAuth;
