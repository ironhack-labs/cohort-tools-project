const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true,  required: true, }, 
  passwordHash: {type: String,  required: true, },
  name: {type: String, }
},

{
    timestamps: true,
  }
)
// CREATE A MODEL
const User = mongoose.model("User", userSchema);

// EXPORT THE MODEL
module.exports = User;
