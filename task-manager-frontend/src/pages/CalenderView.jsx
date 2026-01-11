import { useEffect, useMemo, useState } from "react";
import axios from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import DailyTaskCard from "../components/DailyTaskCard";

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // ---------- FETCH TASKS FOR SELECTED DATE ----------
  useEffect(() => {
    if (!selectedDate) return;

    setLoading(true);

    axios
      .get(`/tasks/by-date?date=${selectedDate}`)
      .then(res => {
        console.log("CALENDAR TASKS:", res.data);
        setTasks(res.data || []);
      })
      .catch(err => {
        console.error("Calendar error:", err);
        setTasks([]);
      })
      .finally(() => setLoading(false));
  }, [selectedDate]);

  // ---------- FILTER ----------
  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter(t => t.completed);
    if (filter === "incomplete") return tasks.filter(t => !t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 px-6 py-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-1">
          Calendar
        </h1>
        <p className="text-slate-500 mb-6">
          View tasks scheduled for a selected date
        </p>

        {/* DATE PICKER */}
        <div className="mb-6">
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-2 mb-4">
          {["all", "completed", "incomplete"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded border text-sm
                ${filter === f
                  ? "bg-slate-900 text-white"
                  : "bg-white"
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* TASK LIST */}
        {loading ? (
          <p className="text-slate-500">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-slate-500">No tasks for this date</p>
        ) : (
          <div className="grid gap-4">
            {filteredTasks.map(task => (
              <DailyTaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
