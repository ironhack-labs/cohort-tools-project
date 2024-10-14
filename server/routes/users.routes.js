//GET /api/users/:id - Retrieves a specific user by id. 
const express = require("express")
const router = express.Router()
const User = require("../models/User.model") 
const verifyToken = require("../middlewares/auth.middleware")

router.get("/:id", verifyToken, async (req, res,next)=>{
  try {
    const response = await User.findById(req.params.id)
    res.status(200).json(response)
  } catch (error) {
    console.log("---------",error)
    next(error)
  }
})



module.exports = router