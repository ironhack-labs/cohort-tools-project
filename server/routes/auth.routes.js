const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();

// Signup route
router.post('/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = new User({ email, password, name });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, '2d61dda4dbdc11bba09a6ce778f2b488aa860b6bbefda4e0e8c5fca3b21fc0f358e14f07df207d1e9120a6b4c3ebcaf51b958a2b94aabd8b5cd76b933c6b5f2c', { expiresIn: '1h' }); 
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Verify route
router.get('/auth/verify', (req, res) => {
 
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, '2d61dda4dbdc11bba09a6ce778f2b488aa860b6bbefda4e0e8c5fca3b21fc0f358e14f07df207d1e9120a6b4c3ebcaf51b958a2b94aabd8b5cd76b933c6b5f2c'); 
    res.json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});

module.exports = router;
