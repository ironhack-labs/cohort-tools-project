const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  if(!req.headers.authorization) {
    res.status(401).send({ error: "No token provided" });
    return;
  }

  const token = req.headers.authorization.split(' ')[1];

  if(!token) {
    res.status(401).send({ error: 'No token provided' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    req.payload = payload;
    next();
  }
  catch (error) {
    res.status(401).send({ error: 'Invalid token' })
  }
}

module.exports = isAuthenticated