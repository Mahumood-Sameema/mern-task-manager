import express from "express";
import {addTask, getTask, deleteTask, updateTask, toggleCompleted, addPlannedTask,getTasksByDate} from "../controller/taskController.js";
import protect from "../middleware/authMiddleware.js";

const taskRouter = express.Router()

taskRouter.post("/",protect, addTask)
taskRouter.get("/",protect, getTask)
taskRouter.delete("/:id",protect,deleteTask)
taskRouter.put("/:id",protect, updateTask)
taskRouter.patch("/:id/toggle",protect, toggleCompleted);
taskRouter.post("/plan", protect, addPlannedTask);
taskRouter.get("/by-date", protect, getTasksByDate);


export default taskRouter;