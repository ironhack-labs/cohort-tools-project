const  jwt = require("jsonwebtoken");

// Instantiate the JWT token validation middleware
const isAuthenticated = (req, res, next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, process.env.TOKEN_SECRET)

    req.payload = payload;
    next();
  }
  catch(error){
    res.status(400).json('Invalid Token')
  }
};

// Export the middleware so that we can use it to create a protected routes
module.exports = {
  isAuthenticated
}
