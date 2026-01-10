import Task from "../models/task.js";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  createTaskWithPlan,
  getTasksForDate
} from "../utils/planner.js";

const addTask = asyncHandler(async (req, res) => {
  const {
    title,
    deadline,
    priority,
    estimatedTimeHours,
    scheduledDate,
    preferredTimeSlot
  } = req.body;

  if (!title || !deadline || !priority || !estimatedTimeHours || !scheduledDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const date = new Date(scheduledDate);
  date.setHours(0, 0, 0, 0);

  const task = await Task.create({
    title,
    deadline,
    priority,
    estimatedTimeHours,
    scheduledDate: scheduledDate,
    preferredTimeSlot,
    completed: false,
    userId: req.user,
    source: "manual",
    userId: req.user
  });

  res.status(201).json({
    message: "Task created",
    task
  });
});


const getTask = asyncHandler(async(req,res) =>{
  const { completed } = req.query;

  let filter = {
    user: req.user
  };

  if (completed !== undefined){
    filter.completed = completed === "true";
  } 

  const task = await Task.find(filter);
  res.json(task);
});

const deleteTask = asyncHandler(async(req,res) =>{
  const {id} = req.params;

  const task = await Task.findByIdAndDelete(id);

  if (!task){
    return res.status(404).json({error: "Task non-found"});
  }

  res.json({
    message: "task deleted",
    task 
  });
});

const updateTask = asyncHandler(async(req,res) => {
  const {id} = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body,{new:true, runValidators: true});

  if (!task){
    return res.status(404).json({error: "Task non-found"});
  }


  res.json({
    message: "task updated",
    task
  })
});

const toggleCompleted = asyncHandler(async(req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;
  await task.save(); 

  res.json({
    message: "Task status updated",
    task
  });
});

const addPlannedTask = asyncHandler(async (req, res) => {
  const { title, deadline, priority, estimatedTimeHours } = req.body;

  if (!title || !deadline || !priority || !estimatedTimeHours) {
    return res.status(400).json({ error: "All fields required" });
  }

  const task = await createTaskWithPlan({
    title,
    deadline,
    priority,
    estimatedTimeHours,
    userId: req.user
  });

  res.status(201).json({
    message: "Task planned successfully",
    task
  });
});

const getTasksByDate = asyncHandler(async (req, res) => {
  const { date } = req.query;

  const tasks = await getTasksForDate(req.user, date);

  res.json(tasks);
});



export {addTask, getTask, deleteTask, updateTask, toggleCompleted, addPlannedTask, getTasksByDate}