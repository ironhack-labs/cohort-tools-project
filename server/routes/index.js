module.exports = app => {

    const studentRouter = require("./student.routes")
    app.use("/api", studentRouter)

    const cohortRouter = require("./cohort.routes")
    app.use("/api", cohortRouter)

}