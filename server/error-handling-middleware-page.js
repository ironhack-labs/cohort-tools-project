function errorHandler (error, req, res, next) {
    console.error("ERROR", req.method, req.path, error)
    if(!res.headersSent) {
        res 
            .status(500)
            .json({ message: error.message})
    }
}

function notFoundHandler (req, res, next) {
    res 
        .status(404)
        .json({message: "This route does not exist "})
}

module.exports = {
    errorHandler,
    notFoundHandler
}


