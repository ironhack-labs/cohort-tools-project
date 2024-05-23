const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    name: String,
  },
  { timestamps: true }
);
//const Student = mongoose.model("Student", studentSchema);
const User = model("User", studentSchema);

// Export the student model
module.exports = User;
