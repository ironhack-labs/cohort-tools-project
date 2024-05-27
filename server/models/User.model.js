mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password:  {type : String},
    name: String
})

const User = model("User", userSchema);
module.exports = User;