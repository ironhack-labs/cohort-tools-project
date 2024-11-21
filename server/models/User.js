const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  profileImage: { 
    type: String, 
    default: 'https://i.imgur.com/r8bo8u7.png'  // Default image if no profile picture is provided
  },
  program: { 
    type: String, 
    enum: ['Web Dev', 'UX/UI', 'Data Analytics', 'Cybersecurity'], 
    required: true 
  },
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort', required: true },
  background: { type: String, default: '' },  // Default empty string
  password: { type: String, required: true }
}, { timestamps: true });



module.exports = mongoose.model("User", userSchema);
