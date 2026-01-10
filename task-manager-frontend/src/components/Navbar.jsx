import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h2 className="font-bold text-indigo-600">TaskPlanner</h2>

      <div className="flex gap-6 text-sm">
        {["today", "plan-task", "calendar"].map(path => (
          <NavLink
            key={path}
            to={`/${path}`}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-medium"
                : "text-slate-600 hover:text-slate-900"
            }
          >
            {path.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase())}
          </NavLink>
        ))}
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="text-sm text-red-500"
      >
        Logout
      </button>
    </div>
  );
}
