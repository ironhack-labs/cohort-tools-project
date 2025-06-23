const mongoose = require("mongoose");
const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username:{
        type: String,
        unique: true, 
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required."], 
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required."], 
        unique: true
    },

    
})

const UserModel = model("User", UserSchema);

module.exports = UserModel;