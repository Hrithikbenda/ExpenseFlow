import { useState, useEffect } from "react";
import axios from "axios";

import SummaryCard from "../components/Summarycard";
import ExpenseForm from "../components/Expenseform";
import Sidebar from "../components/Sidebar";
import AIInsights from "../components/AIInsights";
import AIProfile from "../components/AIProfile";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const userEmail =
        localStorage.getItem("userEmail");

      console.log(
        "Current Logged User:",
        userEmail
      );

      const response = await axios.get(
        `http://localhost:8080/expenses/${userEmail}`
      );

      console.log(
        "Fetched Expenses:",
        response.data
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
      const userEmail =
        localStorage.getItem("userEmail");

      const expenseToSave = {
        ...newExpense,
        userEmail,
      };

      console.log(
        "Saving Expense:",
        expenseToSave
      );

      await axios.post(
        "http://localhost:8080/expenses",
        expenseToSave
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
    (sum, expense) =>
      sum + expense.amount,
    0
  );

  const userEmail =
    localStorage.getItem("userEmail");

  const salary = Number(
    localStorage.getItem(
      `salary_${userEmail}`
    ) || 0
  );

  const budget = Number(
    localStorage.getItem(
      `budget_${userEmail}`
    ) || 0
  );

  const budgetUsed =
    budget > 0
      ? (totalExpenses / budget) * 100
      : 0;

  const remainingBalance =
    salary - totalExpenses;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <div>
            <h1 className="text-6xl font-bold">
              ExpenseFlow 💰
            </h1>

            <p className="text-gray-400 mt-2">
              Track every rupee intelligently
            </p>
          </div>
        </div>

        <AIProfile expenses={expenses} />

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

        <div className="mb-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            🎯 Monthly Budget Tracker
          </h2>

          <p className="mb-2">
            Budget: ₹{budget}
          </p>

          <p className="mb-4">
            Spent: ₹{totalExpenses}
          </p>

          <p className="mb-4">
            Remaining: ₹
            {budget - totalExpenses}
          </p>

          <div className="w-full bg-gray-700 rounded-full h-6">
            <div
              className={`h-6 rounded-full ${
                budgetUsed < 80
                  ? "bg-green-500"
                  : budgetUsed < 100
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${Math.min(
                  budgetUsed,
                  100
                )}%`,
              }}
            />
          </div>

          <p className="mt-3 font-bold">
            {budgetUsed.toFixed(1)}%
            of budget used
          </p>

          <p
            className={`mt-2 font-bold ${
              budgetUsed < 80
                ? "text-green-400"
                : budgetUsed < 100
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {budgetUsed < 80
              ? "🟢 Healthy Spending"
              : budgetUsed < 100
              ? "🟡 Near Budget Limit"
              : "🔴 Budget Exceeded"}
          </p>

          <p className="text-gray-300 mt-2">
            {budgetUsed < 80
              ? "You're managing your budget well."
              : budgetUsed < 100
              ? "Be careful! You're approaching your budget limit."
              : "Warning! You have exceeded your monthly budget."}
          </p>
        </div>

        <div className="mb-8">
          <ExpenseForm
            onAddExpense={addExpense}
          />
        </div>

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