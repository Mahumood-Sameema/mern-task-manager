import mongoose from "mongoose";

const behaviorStatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true
  },

  avgTaskCompletionDelayDays: { type: Number, default: 0 },

  taskCompletionRate: { type: Number, default: 0 },

  frequentMissedDeadlines: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("BehaviorStats", behaviorStatsSchema);
