const User = require('../models/User.model');
const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');


// GET /api/users/:id - Retrieves a specific user by id
 router.get('/users/:id', isAuthenticated, (req, res, next) => {
    // Get the user id from the request parameters
    const userId = req.params.id;
    
    // Find the user by id in the database
    User.findById(userId)
      .then((foundUser) => {
        // If the user is found, return it as the response
        if (foundUser) {
          res.status(200).json({ user: foundUser });
        }
        // If the user is not found, send an error response
        else {
          res.status(404).json({ message: "User not found." });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  });


module.exports = router;