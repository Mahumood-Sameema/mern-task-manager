import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import EmptyState from "../components/EmptyState.jsx";
import DailyTaskCard from "../components/DailyTaskCard.jsx";
import axios from "../api/axiosInstance.js";

export default function TodayTasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const today = new Date().toISOString().split("T")[0];

    try {
      const res = await axios.get(`/tasks/by-date?date=${today}`);
      setTasks(res.data);
    } catch {
      
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 px-6 py-6">
        <h1 className="text-2xl font-semibold mb-6">Today</h1>

        {tasks.length === 0 ? (
          <EmptyState
            title="No tasks planned for today"
            actionLabel="Plan Tasks"
            onAction={() => navigate("/plan")}
          />
        ) : (
          <div className="grid gap-4">
            {tasks.map(task => (
              <DailyTaskCard
                key={task._id}
                task={task}
                onRefresh={fetchTasks}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
