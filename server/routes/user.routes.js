const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { isAuthenticated } = require('../middlewares/route-guard.middleware')

// Get users by id

router.get('/:userId', isAuthenticated, async (req, res, next) => {
    console.log('Log from handler')
    const {userId} = req.params
    try {
      const currentUser = await User.findById(userId)
      res.json(currentUser)
    } catch (error) {
      next(error)
    }
  })

  router.post("/", async (req, res, next) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;