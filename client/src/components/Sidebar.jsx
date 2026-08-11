import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition";

  const activeStyle =
    "bg-blue-600 text-white shadow-lg";

  return (
    <aside className="w-72 bg-white border-r border-gray-200 min-h-screen p-6 flex flex-col">

      <h1 className="text-3xl font-bold text-blue-600 mb-10">
        💰 Expense Tracker
      </h1>

      <nav className="space-y-3 flex-1">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <LayoutDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <Receipt size={22} />
          Transactions
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <BarChart3 size={22} />
          Analytics
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <User size={22} />
          Profile
        </NavLink>

      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-red-500 hover:text-red-700 font-semibold"
      >
        <LogOut size={22} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;