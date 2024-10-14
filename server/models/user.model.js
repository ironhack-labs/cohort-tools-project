const {Schema , model} = require ("mongoose")

const userSchema = new Schema(
  {

  email:{
    type: String,
    required:[true, "Email is requied."],
    unique: true,
    lowercase: true,
    trim: true

  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  username: {
    type: String, 
    required: [true, "Username is required"]
  }
  },

  {
 timestamps: true
  }
  

  



)

const User = model("User", userSchema);

module.exports = User;