const router = require('express').Router();

const User = require('../models/User.model');

router.get('/users', (req, res) => {
  User.find()
    .then((users) => {
      console.log("Retrived users->", users);
      res.json(users)
    })
    .catch((err) => {
      console.error("Error while retrieving users ->", err);
      res.status(500).json({error: "Failed to retrieve users"});
    });
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if(!user) {
        return res.status(404).json({error: 'User not found' })
      }

      res.status(200).json(user)
    })
    .catch((error)=> {
      console.error('Error getting user by Id', error);
      res.status(500).json({ error: 'Failed to get user by Id'});
    });
});

module.exports = router;