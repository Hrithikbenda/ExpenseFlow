import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyChart from "../components/MonthlyChart";

function Analytics() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const userEmail =
        localStorage.getItem("userEmail");

      const response = await axios.get(
        `http://localhost:8080/expenses/${userEmail}`
      );

      setExpenses(response.data);
    } catch (error) {
      console.error(
        "Error fetching expenses:",
        error
      );
    }
  };

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryTotals = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      expense.amount;
  });

  const topCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce(
          (a, b) =>
            categoryTotals[a] >
            categoryTotals[b]
              ? a
              : b
        )
      : "N/A";

  const averageExpense =
    expenses.length > 0
      ? (
          totalSpent / expenses.length
        ).toFixed(2)
      : 0;

  const largestExpense =
    expenses.length > 0
      ? expenses.reduce((max, expense) =>
          expense.amount > max.amount
            ? expense
            : max
        )
      : null;

  const topCategoryAmount =
    topCategory !== "N/A"
      ? categoryTotals[topCategory]
      : 0;

  const monthlySavings = (
    topCategoryAmount * 0.1
  ).toFixed(2);

  const yearlySavings = (
    monthlySavings * 12
  ).toFixed(2);
  const monthlyTotals = {};

expenses.forEach((expense) => {
  const date = new Date(expense.date);

  const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

  monthlyTotals[monthKey] =
    (monthlyTotals[monthKey] || 0) +
    expense.amount;
});

const sortedMonths =
  Object.keys(monthlyTotals).sort();

const currentMonthTotal =
  sortedMonths.length > 0
    ? monthlyTotals[
        sortedMonths[
          sortedMonths.length - 1
        ]
      ]
    : 0;

const previousMonthTotal =
  sortedMonths.length > 1
    ? monthlyTotals[
        sortedMonths[
          sortedMonths.length - 2
        ]
      ]
    : 0;

const trendPercentage =
  previousMonthTotal > 0
    ? (
        ((currentMonthTotal -
          previousMonthTotal) /
          previousMonthTotal) *
        100
      ).toFixed(1)
    : 0;

const trendUp =
  currentMonthTotal >
  previousMonthTotal;

  const spendingPercentage =
    totalSpent > 0
      ? (
          (topCategoryAmount /
            totalSpent) *
          100
        ).toFixed(1)
      : 0;

  let alertColor =
    "text-green-400";

  let alertTitle =
    "🟢 Healthy Spending";

  if (spendingPercentage > 40) {
    alertColor =
      "text-yellow-400";

    alertTitle =
      "🟡 Watch Spending";
  }

  if (spendingPercentage > 60) {
    alertColor =
      "text-red-400";

    alertTitle =
      "🔴 High Spending Alert";
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-5xl font-bold mb-8">
          📈 Expense Analytics
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h3 className="text-gray-300">
              🔥 Largest Expense
            </h3>

            {largestExpense ? (
              <>
                <p className="text-3xl font-bold mt-3">
                  ₹{largestExpense.amount}
                </p>

                <p className="text-gray-400 mt-2">
                  {largestExpense.category}
                </p>
              </>
            ) : (
              <p className="text-xl mt-3">
                No Expenses
              </p>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h3 className="text-gray-300">
              🏆 Top Category
            </h3>

            <p className="text-3xl font-bold mt-3">
              {topCategory}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h3 className="text-gray-300">
              💸 Average Expense
            </h3>

            <p className="text-3xl font-bold mt-3">
              ₹{averageExpense}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h3 className="text-gray-300">
              💰 Potential Savings
            </h3>

            <p className="mt-2">
              Top Category:
            </p>

            <p className="font-bold text-xl">
              {topCategory}
            </p>

            <p className="mt-3">
              Reduce by 10%
            </p>

            <p className="text-green-400 font-bold text-xl">
              ₹{monthlySavings}/month
            </p>

            <p className="text-green-300">
              ₹{yearlySavings}/year
            </p>
          </div>

        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8">
          <h3 className={alertColor}>
            {alertTitle}
          </h3>

          <p className="mt-3">
            {topCategory} accounts for
          </p>

          <p className="text-3xl font-bold mt-2">
            {spendingPercentage}%
          </p>

          <p className="text-gray-400 mt-2">
            of your total spending.
          </p>

          <p className="text-sm mt-3">
            Try keeping your highest category
            below 50%.
          </p>
        </div>

        <>
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8">

    <h2 className="text-2xl font-bold mb-4">
      📈 Monthly Trend Analysis
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      <div>
        <p className="text-gray-400">
          Current Month
        </p>

        <p className="text-3xl font-bold text-green-400">
          ₹{currentMonthTotal.toFixed(2)}
        </p>
      </div>

      <div>
        <p className="text-gray-400">
          Previous Month
        </p>

        <p className="text-3xl font-bold text-blue-400">
          ₹{previousMonthTotal.toFixed(2)}
        </p>
      </div>

      <div>
        <p className="text-gray-400">
          Spending Change
        </p>

        <p
          className={`text-3xl font-bold ${
            trendUp
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          {trendUp ? "📈" : "📉"}{" "}
          {Math.abs(
            trendPercentage
          )}
          %
        </p>
      </div>

    </div>

  </div>

  <div className="grid lg:grid-cols-2 gap-6">
    <ExpenseChart expenses={expenses} />
    <MonthlyChart expenses={expenses} />
  </div>
</>

      </div>
    </div>
  );
}

export default Analytics;