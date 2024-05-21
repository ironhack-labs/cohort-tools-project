// ! modules
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    throw new Error("User must have a token");
  }

  let payload;

  try {
    payload = jwt.verify(token, "secret-key");
  } catch (error) {
    throw new Error("User is not authorized");
  }

  req.user = payload;
  next();
};
