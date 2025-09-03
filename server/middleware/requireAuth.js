const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'dev' } = process.env;

module.exports = function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const [scheme, token] = auth.split(' ');
    if (scheme !== 'Bearer' || !token) return res.status(401).json({ error: 'No token' });
    req.user = jwt.verify(token, JWT_SECRET); // adds { sub, email, iat, exp }
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
