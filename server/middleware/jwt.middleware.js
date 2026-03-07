import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const payload = jwt.verify(token, "t0k3n$ecr3t");

    req.payload = payload;
    next();
    
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuthenticated;
