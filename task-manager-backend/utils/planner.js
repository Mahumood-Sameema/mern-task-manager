import Task from "../models/task.js";
import DailyPlan from "../models/dailyPlan.js";

const MAX_HOURS_PER_DAY = 6;


export const createTaskWithPlan = async ({
  title,
  estimatedTimeHours,
  deadline,
  priority,
  userId
}) => {


  if (!title || !estimatedTimeHours) {
    throw new Error("Title and estimatedTimeHours are required");
  }

  // Normalize today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find or create today's plan
  let plan = await DailyPlan.findOne({ date: today, userId });

  if (!plan) {
    plan = await DailyPlan.create({
      date: today,
      userId,
      totalPlannedHours: 0
    });
  }

  const availableHours = MAX_HOURS_PER_DAY - plan.totalPlannedHours;

  let scheduledDate;
  let allocatedTimeHours;

  if (estimatedTimeHours <= availableHours) {
    scheduledDate = today;
    allocatedTimeHours = estimatedTimeHours;
  } else {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    scheduledDate = tomorrow;
    allocatedTimeHours = estimatedTimeHours;
  }

  // Create task
  const task = await Task.create({
    title,
    estimatedTimeHours,
    allocatedTimeHours,
    scheduledDate,
    deadline,
    priority,
    userId,
    source: "planner"
  });

  // Update plan
  plan.totalPlannedHours += allocatedTimeHours;
  await plan.save();

  return task;
};

/**
 * Get tasks for a specific date
 */
export const getTasksForDate = async (userId, dateQuery) => {
  let date;

  if (dateQuery) {
    date = new Date(dateQuery);
  } else {
    date = new Date();
  }

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return Task.find({
    userId,
    scheduledDate: { $gte: start, $lte: end }
  }).sort({ priority: -1 });
};

