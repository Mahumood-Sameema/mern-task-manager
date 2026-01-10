import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
      userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title:{
      type : String,
      required : true
    },
    estimatedTimeHours: { type: Number, required: true },
    allocatedTimeHours: {
      type: Number
    },

    scheduledDate: {
      type: Date,
      required: true
    },

    deadline: {
      type : Date,
      required : true
    },
    priority: {
      type : String,
      required : true,
      enum : ["Low", "Medium", "High"],
      required : true
    },
    preferredTimeSlot: {
    type: String,
    enum: ["morning", "afternoon", "evening"]
    },
    completed: {
      type : Boolean,
      default : false
    },
    source: {
    type: String,
    enum: ["manual", "planner", "ai"],
    default: "manual"
}

  },
  
  { timestamps : true}
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
  
