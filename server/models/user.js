const mongoose = require('mongoose');
const { Schema } = mongoose; // Asegúrate de definir Schema

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;


