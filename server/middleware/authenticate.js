const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, '2d61dda4dbdc11bba09a6ce778f2b488aa860b6bbefda4e0e8c5fca3b21fc0f358e14f07df207d1e9120a6b4c3ebcaf51b958a2b94aabd8b5cd76b933c6b5f2c'); 
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error('No user found with this id');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;
