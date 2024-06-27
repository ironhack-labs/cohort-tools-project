const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: "No token was provided in headers" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token was provided (after Bearer)" });
    }
    const verified = jwt.verify(token, process.env.TOKEN_SIGN_SECRET);

    req.user = verified.payload;
    next();
  } catch (error) {
    console.log(error);
    if (error.message === "jwt malformed") {
      return res
        .status(401)
        .json({ message: "No token was provided (malformed)" });
    }
    res.status(401).json("token not provided or not valid");
  }
};

module.exports = isAuth;
