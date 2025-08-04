const jwt = require("jsonwebtoken")

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.heqders.authorization.split(" ")[1];


        const payload = jwt.verify(token, process.env.TOKEN_SECRET);

        //add payload to the request obj
        req.payload = payload

        next()

    }
    catch(error) {
        res.status(401).json("token not provided or not valid")

    }
}

module.exports = {isAuthenticated};