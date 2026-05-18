const router = require("express").Router();

const verifyToken = require("../middlewares/auth.middlewares");

router.get("/", verifyToken, (req, res) => {
  console.log(req.payload);

  res.send("sending super secret information");
});

module.exports = router;
