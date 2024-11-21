const router = require("express").Router()

router.use("/students", require("./students.routes"))
router.use("/cohorts", require("./cohorts.routes"))


module.exports = router
