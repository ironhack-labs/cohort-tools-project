const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {

  try{

    const tokenArr = req.headers.authorization.split(" ")
    const token = tokenArr[1]

    const payload = jwt.verify(token, process.env.TOKEN_SECRET)

    req.payload = payload

    console.log("facilitando el verifyToken")
    
    next()

  } catch (error) {
    res.status(401).json({message: "unvalid - unexistent Token"})
  }
}

module.exports = verifyToken