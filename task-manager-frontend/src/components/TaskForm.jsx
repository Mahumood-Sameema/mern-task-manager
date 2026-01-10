import { useEffect, useState } from "react";

export default function TaskForm({ onSubmit, initialData }) 
 {
  const [mode, setMode] = useState("manual"); 

  const [form, setForm] = useState({
    title: "",
    estimatedTimeHours: "",
    priority: "Medium",
    deadline: "",
    scheduledDate: ""
  });

  useEffect(() => {
  if (initialData) {
    setForm({
      title: initialData.title,
      priority: initialData.priority,
      estimatedTimeHours: initialData.estimatedTimeHours,
      deadline: initialData.deadline,
      preferredTimeSlot: initialData.preferredTimeSlot || "",
      scheduledDate: initialData.scheduledDate?.split("T")[0],
      source: initialData.source
    });
  }
}, [initialData]);


  useEffect(() => {
    if (initialData) {
      setMode(initialData.source || "manual");

      setForm({
        title: initialData.title,
        estimatedTimeHours: initialData.estimatedTimeHours,
        priority: initialData.priority,
        deadline: initialData.deadline?.slice(0, 10),
        scheduledDate: initialData.scheduledDate?.slice(0, 10)
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.deadline || !form.estimatedTimeHours) {
      alert("Missing required fields");
      return;
    }

    if (mode === "manual") {
      if (!form.scheduledDate) {
        alert("Please select a scheduled date");
        return;
      }

      onSubmit({
        ...form,
        source: "manual"
      });
    }

    if (mode === "planner") {
      onSubmit({
        title: form.title,
        estimatedTimeHours: Number(form.estimatedTimeHours),
        priority: form.priority,
        deadline: form.deadline,
        source: "planner"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6 space-y-4">

      {/* MODE SELECT */}
      <div>
        <label className="font-semibold">Scheduling Mode</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="manual">I will schedule it</option>
          <option value="planner">Auto-plan for me</option>
        </select>
      </div>

      <input
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="number"
        name="estimatedTimeHours"
        placeholder="Estimated hours"
        value={form.estimatedTimeHours}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <div>
        <label className="text-sm">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* ONLY FOR MANUAL */}
      {mode === "manual" && (
        <div>
          <label className="text-sm">Scheduled Date</label>
          <input
            type="date"
            name="scheduledDate"
            value={form.scheduledDate}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
      )}

      <button className="bg-black text-white px-4 py-2 rounded w-full">
        {mode === "manual" ? "Add Manual Task" : "Auto Plan Task"}
      </button>
    </form>
  );
}

