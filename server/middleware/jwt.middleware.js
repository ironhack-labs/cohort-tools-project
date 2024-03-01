const { expressjwt: jwt } = require('express-jwt');
const TOKEN_SECRET='1r0Nh4cK';
const isAuthenticated = jwt({
    secret: TOKEN_SECRET,// should be process.env.TOKEN_SECRET
    algorithms: ['HS256'],
    requestProperty: 'payload',
    getToken: getTokenFromHeaders
})



function getTokenFromHeaders(req){
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer "){
        const token = req.headers.authorization.split(" ")[1];
        return token;
    }
    return null;
}

module.exports =  {isAuthenticated} ;