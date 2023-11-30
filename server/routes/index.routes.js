const router = require("express").Router();

//GET /api
router.get("/api", (req, res, next) => {
  res.send("General route !");
});

module.exports = router;
