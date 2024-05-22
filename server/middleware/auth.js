const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
	secret: process.env.TOKEN_SECRET,
	algorithms: ["HS256"],
	requestProperty: "payload",
	getToken: getTokenFromHeaders,
});

function getTokenFromHeaders(req) {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "Bearer"
	) {
		const token = req.headers.authorization.split(" ")[1];
		return token;
	}
	return null;
}

module.exports = { isAuthenticated };
// TOKEN_SECRET=1r0nH4xx0r5
/** with wrong secret
{
  "message": "Internal server error.",
  "err": {
    "code": "invalid_token",
    "status": 401,
    "name": "UnauthorizedError",
    "inner": {
      "name": "JsonWebTokenError",
      "message": "invalid signature"
    }
  }
}
*/
