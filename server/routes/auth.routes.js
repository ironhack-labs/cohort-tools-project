//implementar Use
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const router = require("express").Router();

//importamos middleware
const verifyToken = require("../middlewares/auth.middleware")

// POST /auth/signup - Creates a new user in the database

router.post("/signup", async(req,res, next)=>{

  const {email,password,name} = req.body

  //validaciones de creación de usuario
  
  // 1. Los campos son obligatorios
  if(!email || !password || !name){
    res.status(400).json({message: "Todos los campos son obligatorios"})
    return
  }
  
  // 2. La contraseña debería ser lo suficientemente fuerte
  const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (!regexPass.test(password)) {
    res.status(400).json({message: "la contraseña no es lo suficientemente fuerte"})
    return
  }

  // 3. El email debe tener una estructura correcta
  const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  if (regexEmail.test(email) === false){
      res.status(400).json({message: "el email no tiene una estructura correcta"})
      return
  }

  

  //despues de todas las validaciones --> creamos Usuario

  try {
      // 4. No haya otro usuario con el mismo email --> lo define el modelo
      const foundUser = await User.findOne({email})
      if(foundUser){
       res.status(400).json({message: "usuario ya registrado"})
       return
      }

      const salt = await bcrypt.genSalt(12)
      const hashPassword = await bcrypt.hash(password,salt)

      await User.create({
        email, password: hashPassword, name
      })
      res.sendStatus(201)
    
  } catch (error) {
    console.log("holis",error)
    next(error)
  }
})


// POST /auth/login - Checks the sent email and password and, if email and password are correct returns a JWT
router.post("/login", async (req,res,next) => {
  const {email, password} = req.body
  
  // 1. Validar que todos los campos tengan información
  if(!email || !password){
    res.status(400).json({message: "Todos los campos son obligatorios"})
    return
  }
  
  try {
    // 2. Validar que el usuario exista en la DB
    const foundUser = await User.findOne({email})
    if(!foundUser){
      res.status(400).json({message:"usuario no encontrado con ese correo"})
      return
    }

    // 3. Validar que la contraseña sea correcta
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    
    if (!isPasswordCorrect){
      res.status(400).json({message:"contraseña incorrecta"})
      return
    }
    
    // 4. Enviarle al usuario su token tras la validación
    const payload = {
      _id: foundUser._id,
      email: foundUser.email
    }

    const authToken = jwt.sign(payload,process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d"
    })
    res.status(200).json({ authToken:authToken })

  } catch (error) {
    next(error)
  }
})

// GET /auth/verify - Verifies that the JWT sent by the client is valid

router.get("/verify", verifyToken, (req,res) => {
  res.status(200).json(req.payload)

  //res.send("prueba todo bien. Token cvalido")
})


// 

module.exports = router