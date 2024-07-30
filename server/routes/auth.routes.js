const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const { isAuthenticated } = require('../middlewares/route-guard.middleware')

const router = require('express').Router()
// All routes starts with /auth
router.get('/', (req, res) => {
  res.json('All good in auth')
})

// POST Signup
router.post('/signup', async (req, res, next) => {
  const salt = bcrypt.genSaltSync(13)
  const passwordHash = bcrypt.hashSync(req.body.password, salt)
  try {
    const newUser = await User.create({ ...req.body, passwordHash })
    res.status(201).json(newUser)
  } catch (error) {
    if (error.code === 11000) {
      console.log('duplicate')
    }
    next(error)
  }
})
// POST Login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const potentialUser = await User.findOne({ username })
    if (potentialUser) {
      // User does exists with this username
      if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
        // User has correct credentials
        const token = jwt.sign({ userId: potentialUser._id }, process.env.TOKEN_SECRET)
        res.json({ token })
      } else {
        res.status(403).json({ message: 'Incorrect password' })
      }
    } else {
      res.status(404).json({ message: 'No user with this username' })
    }
  } catch (error) {
    next(error)
  }
})
// GET Verify

router.get('/verify', isAuthenticated, (req, res, next) => {
    console.log(req.tokenPayload)
  })

module.exports = router