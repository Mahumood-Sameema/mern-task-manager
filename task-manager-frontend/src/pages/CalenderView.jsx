import { useEffect, useMemo, useState } from "react";
import axios from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import DailyTaskCard from "../components/DailyTaskCard";

export default function CalendarView() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("/tasks")
      .then(res => setTasks(res.data))
      .catch(() => setTasks([]));
  }, []);

  const normalizeDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };


  const tasksByDate = useMemo(() => {
    const map = {};

    tasks.forEach(task => {
      const key = normalizeDate(task.scheduledDate);

      if (!map[key]) map[key] = [];
      map[key].push(task);
    });

    return map;
  }, [tasks]);


  const filteredTasks = useMemo(() => {
    if (!selectedDate) return [];

    const list = tasksByDate[selectedDate] || [];

    if (filter === "completed") return list.filter(t => t.completed);
    if (filter === "incomplete") return list.filter(t => !t.completed);

    return list;
  }, [selectedDate, filter, tasksByDate]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 px-6 py-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-1">
          Calendar
        </h1>
        {tasks.length>0 ? <p className="text-slate-500 mb-6">
          All tasks scheduled by date
        </p>: <p className="text-slate-500 mb-6">
          No Tasks
        </p>}


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.keys(tasksByDate)
            .sort()
            .map(date => {
              const dayTasks = tasksByDate[date];
              const completed = dayTasks.filter(t => t.completed).length;

              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`text-left border rounded-xl p-4 transition shadow-sm
                    ${selectedDate === date
                      ? "bg-slate-900 text-white"
                      : "bg-white hover:bg-slate-100"
                    }`}
                >
                  <p className="text-sm opacity-70">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric"
                    })}
                  </p>

                  <p className="text-2xl font-semibold mt-2">
                    {dayTasks.length} tasks
                  </p>

                  <p className="text-xs mt-1 opacity-70">
                    {completed}/{dayTasks.length} completed
                  </p>
                </button>
              );
            })}
        </div>


        {selectedDate && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {new Date(selectedDate).toDateString()}
              </h2>

              <div className="flex gap-2">
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
            </div>

            {filteredTasks.length === 0 ? (
              <p className="text-slate-500">No tasks for this filter</p>
            ) : (
              <div className="grid gap-4">
                {filteredTasks.map(task => (
                  <DailyTaskCard key={task._id} task={task} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
