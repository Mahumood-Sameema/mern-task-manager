import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import TodayTasks from "./pages/TodayTask";
import PlanTask from "./pages/PlanTask";
import CalendarView from "./pages/CalenderView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>
        <Route path="/today" element={<TodayTasks />} />
        <Route path="/plan-task" element={<PlanTask />} />
        <Route path="/calendar" element={<CalendarView />} />
      </Route>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
