import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import TaskForm from "../components/TaskForm";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

export default function PlanTask() {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const editingTask = location.state?.task;

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("/tasks");
      setTasks(data);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  };


  const handleAddOrUpdateTask = async (task) => {
    try {
      if (editingTask) {

        await axios.put(`/tasks/${editingTask._id}`, task);
        toast.success("Task updated");

        navigate("/plan-task", { replace: true });
      } else {

        if (task.source === "planner") {
          await axios.post("/tasks/plan", task);
          toast.success("Task planned automatically!");
        } else {
          await axios.post("/tasks", {
            ...task,
            source: "manual"
          });
          toast.success("Manual task added!");
        }
      }

      fetchTasks();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">
          {editingTask ? "Update Task" : "Plan Your Task"}
        </h1>

        <TaskForm
          onSubmit={handleAddOrUpdateTask}
          initialData={editingTask}   
        />
      </div>
    </>
  );
}
