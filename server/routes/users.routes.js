const router = require('express').Router();
const User = require('../models/User.model.js');
const { isAuthenticated } = require('../middleware/jwt.middleware.js');

router.get('/:id' ,isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { password, ...userWithoutPassword } = user._doc;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;