const router = require("express").Router();

router.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

module.exports = router;
