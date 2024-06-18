const jwt = require("jsonwebtoken")

const isAuthenticated = (req, res, next) =>{
    try {

        const token = req.heades.authorization.split(" ")[1];

        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        req.payload = payload;
        next();

    } catch (error) {
        res.status(401).json({message: "token not provided nor valid"})
    }
}

module.exports = {
    isAuthenticated
};