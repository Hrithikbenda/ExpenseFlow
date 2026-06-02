import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Settings() {
  const [name, setName] = useState(
    localStorage.getItem("username") ||
      "Warner"
  );

  const [salary, setSalary] = useState(
    localStorage.getItem("salary") ||
      ""
  );

  const saveSettings = () => {
    localStorage.setItem(
      "username",
      name
    );

    localStorage.setItem(
      "salary",
      salary
    );

    alert(
      "Settings saved successfully 🚀"
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-5xl font-bold mb-8">
          ⚙️ Settings
        </h1>

        <div className="max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

          {/* Profile Name */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-300">
              👤 Profile Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                border border-white/20
                text-white
              "
            />
          </div>

          {/* Salary */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-300">
              💵 Monthly Salary
            </label>

            <input
              type="number"
              value={salary}
              onChange={(e) =>
                setSalary(
                  e.target.value
                )
              }
              placeholder="Enter monthly salary"
              className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                border border-white/20
                text-white
              "
            />
          </div>

          {/* Theme */}
          <div className="mb-6">
            <h3 className="text-xl font-bold">
              🌙 Theme
            </h3>

            <p className="text-gray-400 mt-2">
              Dark Mode Enabled
            </p>
          </div>

          {/* Version */}
          <div className="mb-8">
            <h3 className="text-xl font-bold">
              📦 App Version
            </h3>

            <p className="text-gray-400 mt-2">
              ExpenseFlow v1.0
            </p>
          </div>

          <button
            onClick={saveSettings}
            className="
              bg-blue-600
              hover:bg-blue-700
              px-6
              py-3
              rounded-xl
              font-bold
            "
          >
            Save Settings
          </button>

        </div>
      </div>
    </div>
  );
}

export default Settings;