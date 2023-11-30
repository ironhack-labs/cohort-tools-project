const User = require("../models/User.model")
const express = require("express")
const router = express.Router();

const { isAuthenticated } = require("./../middleware/jwt.middleware");

router.get("/:id", isAuthenticated, async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        console.log(user);
        res.status(200).json(user)
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router

