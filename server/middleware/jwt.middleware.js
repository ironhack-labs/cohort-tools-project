require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");


function authenticateToken() {
  return jwt({
    secret: process.env.TOKEN_SECRET, 
    algorithms: ["HS256"],
  });
}

module.exports = authenticateToken;
