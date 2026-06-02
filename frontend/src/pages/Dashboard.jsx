import { useState, useEffect } from "react";
import axios from "axios";

import SummaryCard from "../components/Summarycard";
import ExpenseForm from "../components/Expenseform";
import Sidebar from "../components/Sidebar";
import AIInsights from "../components/AIInsights";
import AIProfile from "../components/AIProfile";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/expenses"
      );

      setExpenses(response.data);
    } catch (error) {
      console.error(
        "Error fetching expenses:",
        error
      );
    }
  };

  const addExpense = async (newExpense) => {
    try {
      await axios.post(
        "http://localhost:8080/expenses",
        newExpense
      );

      fetchExpenses();
    } catch (error) {
      console.error(
        "Error adding expense:",
        error
      );
    }
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const salary = Number(
    localStorage.getItem("salary") || 0
  );

  const remainingBalance =
    salary - totalExpenses;

  return (
    <div
      className={`flex min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-6xl font-bold">
              ExpenseFlow 💰
            </h1>

            <p
              className={
                darkMode
                  ? "text-gray-400 mt-2"
                  : "text-gray-600 mt-2"
              }
            >
              Track every rupee intelligently
            </p>
          </div>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              px-5
              py-3
              rounded-xl
              text-white
              font-semibold
              shadow-lg
              transition-all
            "
          >
            {darkMode
              ? "☀ Light Mode"
              : "🌙 Dark Mode"}
          </button>
        </div>

        {/* AI Profile */}
        <AIProfile expenses={expenses} />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Monthly Salary"
            amount={salary}
          />

          <SummaryCard
            title="Total Expenses"
            amount={totalExpenses}
          />

          <SummaryCard
            title="Remaining Balance"
            amount={remainingBalance}
          />
        </div>

        {/* Add Expense Form */}
        <div className="mb-8">
          <ExpenseForm
            onAddExpense={addExpense}
          />
        </div>

        {/* AI Financial Coach */}
        <div className="mb-8">
          <AIInsights
            expenses={expenses}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;