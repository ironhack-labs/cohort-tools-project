function errorHandlers(app){

    app.use((req, res) => {
        res.status(404).json({message: "Could't find anything, maybe you've lost." })
    })
    
    app.use((error, req, res, next) => {
        res.status(500).json({errorMessage: "Something went wrong."})
    })
}

module.exports = errorHandlers