import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isAuth from "../middlewares/isAuth.middleware.js";


async function getUser(req, res){
  try{
    const id = req.params.id
    const user = await User.findById(id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found"})

      res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting user"});
  }
}
// const id = req.params.id
// const user = await User.findById(id).select("-password")


// if(!user){
// res.status(404).json({message:"User not found"})  

// }else{
  
//   try {
  



//   res.status(200).json(user) }catch(error){

// console.log(error)
// res.status(404).json({message:"Error getting user"})
  
//   }}
// }




async function createUser(req, res){

try{  const pwdRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

  const {email, password, name} = req.body


  if(!email || !password || !name){
    return res.status(400).json({message:"Email, password and name are required"})
  }

if (!pwdRegex.test(password)) {

  return res.status(400).json({
message: "Password must be 8 chararcters and contain at least one uppercase and one lowercase, a number, and a special character."

  })
  // return
}

const foundUser = await User.findOne({ email: email   })

if(foundUser) { 

  return res.status(409).json({message: "This user is already taken"})
}

const salts = await bcrypt.genSalt(10)

const hashedPassword = await bcrypt.hash(password, salts)

const newUser = await User.create({
email, 
name, 
password: hashedPassword, 

})
res.status(201).json({ _id: newUser._id, email: newUser.email, name: newUser.name });
} catch (error) {
console.log(error)
res.status(500).json({message:"Error creating user"})
  }}


async function login(req, res){

  try{ 
const { email, password} = req.body

if (!email || !password ){ return res.status(400).json({message:"Email and password are required"})}

const foundUser = await User.findOne({email: email})

  

if (!foundUser){
return res.status(404).json({message:"User not found"})

}  

    const passwordCheck = await bcrypt.compare(password, foundUser.password)

    if (!passwordCheck) {
      return res.status(401).json({ message: "Password incorrect" })
    }

const authToken = await jwt.sign(
{
 email:foundUser.email,
 name:foundUser.name,
 _id:foundUser._id,
},
process.env.TOKEN_SECRET, 
{ expiresIn: "24h" }
);


res.
status(200)
.json({ authToken, user: { id: foundUser._id, email: foundUser.email, name: foundUser.name},
   message: "Logged in successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Error logging in"})
  }

}

function userVerified(req, res){

  res.status(200).json(req.user);
}

export {getUser, createUser, login, userVerified}


  
