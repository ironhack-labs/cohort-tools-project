const express = require("express")
const bcrypt = require("bcryptjs"); // is used for encrypting the passwords before saving them in the database
const jwt = require("jsonwebtoken"); //which we will use to create and sign new JSON Web Tokens
const User = require("../models/User.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware");

const router = express.Router();
const saltRounds = 10;

router.get("/", (req, res, next) => {
    res.json("All good in auth");
});

// POST  /auth/signup
router.post("/signup", async (req, res)=>{
    const {email, password, name} = req.body
    
    //check if any field is empty
    if(email==="" || password==="" || name===""){
        res.status(400).json({message: "Provide email, pass and username"});
        return;
    }
    //check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(!emailRegex.test(email)){
        res.status(400).json({message: "Fix email format"});
        return;
    }
    //check if user already exists
    try{
        const response = await User.findOne({email});
        if(response){
            res.status(400).json({message: "User already exists"})
            return
        }
        //if email is unique, hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPass = bcrypt.hashSync(password, salt)
        //create new user in DB

        const createdUser = await User.create({email, name, password: hashedPass})
        
        // Deconstruct the newly created user object to omit the password
        // We should never expose passwords publicly
        
        const user = {email: createdUser.email, name: createdUser.name, _id: createdUser._id};
        console.log(user);
        res.status(201).json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Could not create user. Internal server error"})
    }
})


// POST  /auth/login
// ...
router.post("/login", async (req, res)=>{
    const {email, password} = req.body
    //check if fields are empty
    if(email==="" || password===""){
        res.status(400).json({message: "Provide email and password"})
        return;
    }
    try{
        //check users collection if a user with the same email exists
        const foundUser = await User.findOne({email})
        if(!foundUser){
            res.status(401).json({message: "User not found."})
            return;
        }
        //compare passwords
        const passCorrect = bcrypt.compareSync(password, foundUser.password)
        if(passCorrect){
            const {name, email, _id} = foundUser;

            //create object that will be set as the token payload
            const payload = {_id, email, name};

            //create and sign the token
            //jwt.sign() method returns a new JWT token generated as a Base64 encoded string.
            const authToken = jwt.sign( 
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "6h" }
              );
              console.log("User authenticated");
            res.status(200).json({authToken : authToken})
        }
        else{
            res.status(401).json({ message: "Unable to authenticate the user" });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Could not login."})
    }
 })

// GET  /auth/verify
router.get('/verify', isAuthenticated, (req, res, next) => {       
    console.log(`req.payload`, req.payload);

    res.status(200).json(req.payload);
  });
module.exports = router;




