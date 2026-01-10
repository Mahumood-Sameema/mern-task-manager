import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmModal from "../components/ConfirmModel.jsx";

export default function DailyTaskCard({ task, onRefresh }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const hours =
    task.allocatedTimeHours ??
    task.estimatedTimeHours ??
    0;

  const scheduledDate = task.scheduledDate
    ? new Date(task.scheduledDate).toLocaleDateString()
    : "—";

  const deadLine = task.deadline
    ? new Date(task.deadline).toLocaleDateString()
    : "—";

  const handleToggle = async () => {
    try {
      await axios.patch(`/tasks/${task._id}/toggle`);
      onRefresh();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/tasks/${task._id}`);
      toast.success("Task deleted");
      setShowDelete(false);
      onRefresh();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = () => {
    navigate("/plan-task", {
      state: { task }
    });
  };

  return (
    <>
      <div className="bg-white border rounded-lg p-4 shadow-sm space-y-2">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-slate-900">
            {task.title}
          </h3>

          <span className="text-xs px-2 py-1 rounded bg-slate-100">
            {task.source === "planner" ? "🧠 Planned" : "✍️ Manual"}
          </span>
        </div>

        {/* Minimal info */}
        <div className="text-sm text-slate-600">
          <p>Time: {hours} hrs</p>
          <p>Date: {scheduledDate}</p>
          <p>Deadline: {deadLine}</p>
        </div>

        {/* Expanded info */}
        {expanded && (
          <div className="text-sm text-slate-500 border-t pt-2">
            <p>Priority: {task.priority}</p>
            <p>Scheduled date: {scheduledDate}</p>
            {task.preferredTimeSlot && (
              <p>Time Slot: {task.preferredTimeSlot}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 flex-wrap">
          <button
            onClick={handleToggle}
            className="px-3 py-1 border rounded text-sm"
          >
            {task.completed ? "Undo" : "Done"}
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-1 border rounded text-sm"
          >
            {expanded ? "Hide" : "Details"}
          </button>

          <button
            onClick={handleEdit}
            className="px-3 py-1 border rounded text-sm"
          >
            Update
          </button>

          <button
            onClick={() => setShowDelete(true)}
            className="px-3 py-1 border rounded text-sm text-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* 🔴 Delete Confirmation Modal */}
      <ConfirmModal
        open={showDelete}
        title="Delete task?"
        description="This task will be permanently removed."
        onCancel={() => setShowDelete(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
