const router = require("express").Router()

const bcrypt = require("bcryptjs")
const User = require ("../models/user.model.js")
const jwt = require("jsonwebtoken")

const verifyToken = require("../middlewares/auth.middlewares.js")

//Post signup
router.post("/signup", async (req, res, next)=>{
  console.log("llegando el test")
  const {email, password, username} = req.body
  console.log(req.body)
  if (!email || !password ||!username){
    res.status(400).json({message: "Todos los campos son obligatorios"})
    return
  }

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm;
  if(!regexPassword.test(password)){
    res
    .status(400)
    .json({
      message: "La contraseña debe tener al menos una mayúscula, un número y entre 8 y 16 caracteres"
    })
  }

  try {
    console.log("llegando el test2")
    const foundUser = await User.findOne({ email: email})
    if(foundUser){
      res.status(400).json({ message: "Usuario ya registrado con ese email"})
      return;
    }
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    await User.create({
      email,
      password: hashPassword,
      username
    })
    res.sendStatus(201)
    
  } catch (error) {
    next(error)
  }


})


// POST "/api/auth/login" => recibe credenciales de usuario y lo autentica. Envía Token (llave virtual).

router.post("/login", async (req, res, next)=>{
console.log("llegando al login")
  const {email, password} = req.body
  

    if(!email || !password){

        res.status(400).json("Todos los campos son obligatorios")
        return
    }
    try {
        const foundUser = await User.findOne({email: email})
        
        if(!foundUser){
            res.status(400).json("Usuario no encontrado con ese email")
            return
        }

        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
        if(!isPasswordCorrect){
            res.status(400).json("Contraseña incorrecta")
            return
        }
        const payload ={
        _id: foundUser._id,
        email: foundUser.email
    }
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET,{
          algorithm: "HS256",
          expiresIn: "7d"
      })  
      
    res.status(200).json({ authToken: authToken })
        
    } catch (error) {
        next(error)
    }
})

router.get("/user/:id", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    console.log("llegando al id")

    if (!user) {
      return res.status(404).json({ message: "user not found by id" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
})


router.get("/verify", verifyToken, (req, res) => {
console.log("llegando al verify")
  // console.log(req.payload)

  res.status(200).json(req.payload)
})

module.exports = router