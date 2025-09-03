const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const User = require('../models/User.model');

router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const doc = await User.findById(req.params.id).select('-password');
    if (!doc) return res.status(404).json({ error: 'User not found' });
    res.json(doc);
  } catch (e) { next(e); }
});

module.exports = router;
