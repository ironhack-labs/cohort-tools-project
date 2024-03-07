
module.exports = (app) => {


    // 404
    app.use((req, res, next) => {
        res.status(404).json({errorMessage: "Esta ruta no existe"})
    })

    // 500
    app.use((req, res, next) => {
        res.status(500).json({errorMessage: "El servidor explotó :_("})
    })
}