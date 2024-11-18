const express = require('express');
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt');
const router = require('express').Router();

router.get('/api/users', isAuthenticated, (req, res, next) => {
    
  // Instead of /api/users/:userid, pass req.payload._id as a argument that already contains the user ID
    User.findById(req.payload._id)
      .then((usersFromDB) => {
        res.status(200).json(usersFromDB);
      })
      .catch((error) => {
        next(error);
        console.log(error);
        res.status(500).json({ error: "Failed to get the users details" });
      });
})

module.exports = router;