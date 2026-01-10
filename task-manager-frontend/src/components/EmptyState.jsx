import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-bold">No tasks planned for today</h2>
      <div className="mt-4 flex gap-4 justify-center">
        <Link to="/plan-task" className="border px-4 py-2 rounded">
          Plan My Day
        </Link>
      </div>
    </div>
  );
}
