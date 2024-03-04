const router = require("express").Router();
const User = require ("../models/User.model.js")
const cors = require("cors");


const corsOptions = {
    origin: ['http://localhost:5005', "http://localhost:5173"],
    optionsSuccessStatus: 200
  }

  //GET /api/users/:id - Retrieves a specific user by id. 
  //The route should be protected by the authentication middleware


  const authenticateUser = (req, res, next) => {
    // Check if the user is authenticated (e.g., by verifying a token or session)
    // If authenticated, proceed to the next middleware or route handler
    // Otherwise, send an unauthorized response (e.g., 401 Unauthorized)
    // Example:
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

  router.get("/users/:id", cors(corsOptions), authenticateUser, async(req, res, next) => {
    const {id} = req.params;
    const user = await User.findById(id);
    try { if(!User){throw new Error ("error found");}
        res.json(User)
    }
    catch(error){
        next(error);
    }
  })

  module.exports = router;

