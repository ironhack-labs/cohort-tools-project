const express = require('express');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User.model');

const router = express.Router();

// GET /api/users - Get all users
router.get('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;

  if (req.payload._id !== id) {
    return res.status(403).json({ message: 'You do not have permission to access this resource.' });
  }

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const { email, name, _id } = user;
      res.status(200).json({ user: { email, name, _id } });
    })
    .catch((err) => res.status(500).json({ message: 'Internal Server Error' }));
});

module.exports = router;
