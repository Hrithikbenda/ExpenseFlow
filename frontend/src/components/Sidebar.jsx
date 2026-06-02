import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="
        w-72
        min-h-screen
        bg-black/30
        backdrop-blur-xl
        border-r border-white/10
        p-8
        flex
        flex-col
      "
    >
      <div>
        <h1
          className="
            text-4xl
            font-extrabold
            text-white
            mb-2
          "
        >
          💰 ExpenseFlow
        </h1>

        <p className="text-gray-400 text-sm mb-10">
          Smart Expense Management
        </p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">

          {/* Dashboard */}
          <li
            onClick={() => navigate("/")}
            className={`
              rounded-xl
              px-4
              py-3
              cursor-pointer
              transition-all
              duration-300
              ${
                location.pathname === "/"
                  ? "bg-blue-500/20 text-white border border-blue-500/30"
                  : "text-gray-300 hover:bg-white/10"
              }
            `}
          >
            📊 Dashboard
          </li>

          {/* Analytics */}
          <li
            onClick={() =>
              navigate("/analytics")
            }
            className={`
              rounded-xl
              px-4
              py-3
              cursor-pointer
              transition-all
              duration-300
              ${
                location.pathname ===
                "/analytics"
                  ? "bg-blue-500/20 text-white border border-blue-500/30"
                  : "text-gray-300 hover:bg-white/10"
              }
            `}
          >
            📈 Analytics
          </li>

          {/* Expenses */}
          <li
            onClick={() =>
              navigate("/expenses")
            }
            className={`
              rounded-xl
              px-4
              py-3
              cursor-pointer
              transition-all
              duration-300
              ${
                location.pathname ===
                "/expenses"
                  ? "bg-blue-500/20 text-white border border-blue-500/30"
                  : "text-gray-300 hover:bg-white/10"
              }
            `}
          >
            💳 Expenses
          </li>

          {/* Settings */}
          <li
            onClick={() =>
              navigate("/settings")
            }
            className={`
              rounded-xl
              px-4
              py-3
              cursor-pointer
              transition-all
              duration-300
              ${
                location.pathname ===
                "/settings"
                  ? "bg-blue-500/20 text-white border border-blue-500/30"
                  : "text-gray-300 hover:bg-white/10"
              }
            `}
          >
            ⚙️ Settings
          </li>

        </ul>
      </nav>

      <div
        className="
          mt-auto
          bg-gradient-to-r
          from-purple-600/20
          to-blue-600/20
          rounded-2xl
          p-4
          border border-white/10
        "
      >
        <h3 className="text-white font-bold mb-2">
          🤖 AI Insights
        </h3>

        <p className="text-gray-300 text-sm">
          Smart spending analysis powered by AI.
        </p>

        <p className="text-green-400 text-xs mt-2">
          Financial Coach Active 🚀
        </p>
      </div>
    </div>
  );
}

export default Sidebar;