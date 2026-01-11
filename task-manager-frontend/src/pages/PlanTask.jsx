import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import TaskForm from "../components/TaskForm";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

export default function PlanTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const editingTask = location.state?.task;

  // ---------- FETCH TASKS ----------
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/tasks");
      setTasks(data || []);
    } catch (err) {
      console.error("Fetch tasks error:", err.response?.data || err);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------- HANDLE ADD OR UPDATE TASK ----------
  const handleAddOrUpdateTask = async (task) => {
    try {
      // ---------- VALIDATE REQUIRED FIELDS ----------
      const { title, deadline, priority, estimatedTimeHours, source } = task;

      if (!title || !deadline || !priority || !estimatedTimeHours) {
        toast.error("Please fill all required fields");
        return;
      }

      // ---------- LOG DATA BEFORE SENDING ----------
      console.log("Submitting task:", task);

      // ---------- EDIT EXISTING TASK ----------
      if (editingTask) {
        await axios.put(`/tasks/${editingTask._id}`, task);
        toast.success("Task updated successfully!");
        navigate("/plan-task", { replace: true });
      } else {
        // ---------- PLANNER TASK ----------
        if (source === "planner") {
          const plannerTaskData = { title, deadline, priority, estimatedTimeHours };
          console.log("Sending planner task to backend:", plannerTaskData);

          const res = await axios.post("/tasks/plan", plannerTaskData);
          console.log("Planner task response:", res.data);
          toast.success("Task planned automatically!");
        } else {
          // ---------- MANUAL TASK ----------
          await axios.post("/tasks", { ...task, source: "manual" });
          toast.success("Manual task added!");
        }
      }

      fetchTasks(); // refresh tasks
    } catch (err) {
      console.error("PlanTask action error:", err.response?.data || err);
      toast.error(err.response?.data?.error || "Action failed");
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

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>

          {loading ? (
            <p className="text-slate-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-slate-500">No tasks yet</p>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="border rounded-xl p-4 flex justify-between items-center shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm opacity-70">
                      Deadline: {new Date(task.deadline).toLocaleDateString()}
                    </p>
                    <p className="text-sm opacity-70">
                      Priority: {task.priority} | Source: {task.source}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate("/plan-task", { state: { task } })
                    }
                    className="px-3 py-1 bg-slate-900 text-white rounded-lg text-sm"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
