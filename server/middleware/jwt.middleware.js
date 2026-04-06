const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
  secret: "1r0Nh4cK",
  algorithms: ["HS256"],
  requestProperty: "payload",
});

module.exports = isAuthenticated;