import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName : {
      type: String,
      required : true,
      trim: true
    },
    email :{
      type: String,
      required: false,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address"
      ]
    },
    password : {
      type: String,
      required : true,
      minlength: 6
    },
    userContext: {
    workingHoursPerDay: { type: Number, default: 6 },
    focusCapacity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    preferredWorkingTime: {
      type: String,
      enum: ["morning", "evening"],
      default: "morning"
    },
    maxTasksPerDay: { type: Number, default: 5 }
  }
  }, { timestamps: true 
  }
);

const Users = mongoose.model("Users",userSchema)

export default Users;