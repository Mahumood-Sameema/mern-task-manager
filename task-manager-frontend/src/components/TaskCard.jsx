export default function TaskCard({ task, toggleCompletion }) {
  const date = new Date(task.scheduledDate).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });

  return (
    <div className="border p-4 rounded flex justify-between bg-white">
      <div>
        <h3 className="font-semibold">{task.title}</h3>

        <p className="text-sm text-slate-500">
          {date}
        </p>

        <p className="text-sm">Priority: {task.priority}</p>

        <p className="text-sm">
          {task.source === "planner" ? "🧠 Planned" : "✍️ Manual"}
        </p>
      </div>

      <button
        onClick={() => toggleCompletion(task._id)}
        className="border px-3 py-1 rounded"
      >
        {task.completed ? "Undo" : "Done"}
      </button>
    </div>
  );
}
