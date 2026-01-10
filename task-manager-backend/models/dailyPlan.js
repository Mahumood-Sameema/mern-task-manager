import mongoose from "mongoose";

const plannedTaskSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  },

  allocatedTimeHours: Number,

  timeSlot: {
    type: String,
    enum: ["morning", "afternoon", "evening"]
  },

  reason: String
}, { _id: false });

const dailyPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  date: { type: Date, required: true },

  totalPlannedHours: Number,

  tasks: [plannedTaskSchema]
}, { timestamps: true });

export default mongoose.model("DailyPlan", dailyPlanSchema);
