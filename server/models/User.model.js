const {model, Schema} = require("mongoose");

const userSchema = new Schema({
    email: {type: String, unique:true},
    password: {type: String},
    name: {type: String, required: true}
});

module.exports = model("User", userSchema);