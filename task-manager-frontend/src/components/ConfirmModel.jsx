export default function ConfirmModal({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onCancel,
  onConfirm
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-900">
          {title}
        </h2>

        <p className="text-sm text-slate-600 mt-2">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded border"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
