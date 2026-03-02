const router = require("express").Router();
const User = require("../models/User.model");
// Post "/api/auth/signup"=> creating a user document
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const verifyToken = require("../middlewares/auth.middlewares")

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  // are the 3 fields received
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({ errorMessage: "3 fiels are required" });
    return; //
  }
  // password string enough
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res
      .status(400)
      .json({
        errorMessage: "Password must follow this pattern (min 8, U, l, n, SC)",
      });
    return; //
  }

  try {
    // does the email already exist?
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(400).json({ errorMessage: "email exist go to login" });
      return; //
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const response = await User.create({
      email: email,
      password: hashPassword,
      name: name,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// login

router.post("/login", async (req, res, next) =>{
  const { email, password} = req.body;
  if (!email || !password ) {
    res.status(400).json({ errorMessage: "2 fiels are required" });
    return; //
  }

  try {
    const foundUser = await User.findOne({email: email})
    if(!foundUser){
        res.status(400).json({ errorMessage: "no user found go signup"});
        return; //
    }
    const comparePass = await bcrypt.compare(password,foundUser.password )
    if(comparePass === false){
      res.status(400).json({ errorMessage: "try another password this one is wrong" });
       return
    }
    const payload= {
        _id: foundUser._id,
        email: foundUser.email
    }
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm:"HS256",
        expiresIn: "7d"
    })
    res.status(200).json({authToken: authToken, payload: payload})
  } catch (error) {
    next(error)
  }
})

router.get('/verify', verifyToken, (req, res, next)=>{
    res.status(200).json({payload: req.payload})
})

module.exports = router