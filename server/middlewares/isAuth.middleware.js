import jwt from "jsonwebtoken";

export default function isAuth(req, res, next) {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer" &&
      req.headers.authorization.split(" ")[1]
    ) {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized - Token invalid" });
        }
        req.user = decoded;
        next();
      });
    } else {
      res.status(401).json({ message: "Token not provided" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error verifying token" });
  }
}


  
  