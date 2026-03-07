import express from "express"
const router = express.Router()
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js"
import isAuthenticated from "../middleware/jwt.middleware.js";

// POST /auth/signup - Creates a new user in the database
router.post("/signup", async (req, res)=>{
    try {
    const {username, email, password} = req.body
    if (!username || !email || !password){
        return res.status(400).json({message: "Please provide all info"})
    }

    const foundUser = await userModel.findOne({ $or: [{email}, {username}]})
    if (foundUser) {
        return res.status(400).json({message: "Email of username already taken"} )
    }

    if (!password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$",)){
return res.status(400).json({message: "Password needs at least 8 characters, and numbers"})
    }
    
    const salts = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salts)
   
    const createdUser = await userModel.create({
        username, email, password: hashedPassword
    })


return res.status(201).json({message: "User created", createdUser})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
)


// POST /auth/login - Checks the sent email and password and, if email and password are correct returns a JWT
router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body

    if (!(email || username) || !password) {
      return res.status(400).json({ message: "Please provide all info" })
    }

    const foundUser = await userModel.findOne({ $or: [{ email }, { username }] })
    if (!foundUser) {
      return res.status(400).json({ message: "User doesn't exist" })
    }

    // const isValid = await bcrypt.compare(password, foundUser.password)

    if (!bcrypt.compareSync(password, foundUser.password)) {
      return res.status(400).json({ message: "Incorrect password" })
    }

    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    }

    const authToken = jwt.sign(payload, "t0k3n$ecr3t", {
      expiresIn: "6h",
      algorithm: "HS256",
    })

    return res.status(200).json({ message: "Successfuly logged in", authToken })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

// GET /auth/verify - Verifies that the JWT sent by the client is valid
router.get("/verify", isAuthenticated, (req, res) => {
  console.log(req.auth)

  res.status(200).json("verified")
})

// GET /api/users/:id - Retrieves a specific user by id. The route should be protected by the authentication middleware.
router.get ("/api/users/:id", isAuthenticated, async (req, res)=>{
    
    try{
 if (isAuthenticated){
const user = await userModel.findById(req.params.id).select("-password");
res.status(200).json(user)
    } 
    }
    catch (error){
console.log(error)
res.status(500).json(error)
    }
   
})
export default router