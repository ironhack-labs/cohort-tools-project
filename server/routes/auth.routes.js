// THE COMMAND TO INSTALL THE DEPENDECIES WE NEED FOR THE AUTH.
// npm install bcryptjs jsonwebtoken express-jwt
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model")
const router = express.Router();
const {isAuthenticated} = require('../middleware/jwt.middleware');
const saltRounds = 10; // the calculation to encrypt the JWT

// POST   /auth/signup  - this one will create a new user in the database
router.post('/signup', (req, res)=>{
    const {email, password, name} = req.body;

    if(email ===''|| password ===''|| name ===''){

        res.status(400).json({message: 'Invalid email or password or name!'})
        return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)){
        res.status(400).json({message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.'})
        return;
    }
    
    User.findOne({email})
    .then((foundUser)=>{
        if (foundUser){
            res.status(400).json({message: 'User already exists'});
            return;
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);
        return User.create({email, password: hashPassword, name});
    })
    .then((createdUser)=>{
        const {email, name, id} = createdUser;
        const user = {email, name, id};
        res.status(201).json({user: user});
        
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({message: 'Internal server error'})
    })

})



// POST   /auth/login 
router.post('/login', (req, res)=>{
    const {email, password} = req.body;
    if(email ==='' || password ===''){
        res.status(400).json({message: 'Invalid email or password'});
        return;
    }

    User.findOne({email})
    .then((foundUser)=>{
    if(!foundUser){
        res.status(401).json({message: 'User not found'});
        return;
    }

    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
    if(passwordCorrect){
        const { id, email, name } = foundUser;
        const payload = { id, email, name };
        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            { algorithm: 'HS256', expiresIn: '6H'}
        )

        res.status(200).json({authToken: authToken});
    }
    else{
        res.status(401).json({message: 'Internal Server Error'});
    }
    })
    .catch(error=> res.status(500).json({message: 'Internal Server Error'}))
})


// GET   /auth/verify
 router.get('/verify', isAuthenticated, (req, res) =>{
    console.log(`req.payload`, req.payload);
    
    res.status(200).json(req.payload);
}) 

module.exports = router;