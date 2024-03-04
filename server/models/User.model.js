
const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    email: {type: 'string', required: true, unique: true},
    password: {type: 'string', required: true, unique: true},
    name: {type:'string', required: true}
});



module.exports = model("User", userSchema);