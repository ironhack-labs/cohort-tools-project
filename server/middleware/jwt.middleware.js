const jwt = require('jsonwebtoken')

function isAuthenticated(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]; 
        
        const payload = jwt.verify(token, "test");

        req.payload = payload;

        next();
    } catch(error) {
        res.status(401).json("token not provided or not valid");
    }
}

module.exports = {
    isAuthenticated
}