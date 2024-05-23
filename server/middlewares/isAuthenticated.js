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
  } catch (error) {
    next(error);
  }
}

router.get("/verify", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.currentUserId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
