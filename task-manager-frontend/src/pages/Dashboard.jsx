import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("/tasks");
      setTasks(data);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddOrUpdateTask = async (task) => {
    try {
      if (task.mode === "planner") {
        await axios.post("/tasks/plan", task);
        toast.success("Task planned automatically!");
      } else {
        await axios.post("/tasks", {
          ...task,
          source: "manual"
        });
        toast.success("Manual task added!");
      }

      fetchTasks();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const toggleCompletion = async (id) => {
    try {
      await axios.patch(`/tasks/${id}/toggle`);
      fetchTasks();
    } catch {
      toast.error("Failed to toggle completion");
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "incomplete") return !t.completed;
    return true;
  });

  return (
    <><div>
      <Navbar />
      yet to do
      </div>
    </>
  );
}
