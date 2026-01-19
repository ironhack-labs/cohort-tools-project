const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    profilePicture: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1496602447/photo/human.jpg?s=2048x2048&w=is&k=20&c=gNMd_7mQn5nTCUfu-0iv0G6jayEANRPtFa52wAh03lM=",
    },
    pets: {
      type: [Schema.Types.ObjectId],
      ref: "Pet",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
