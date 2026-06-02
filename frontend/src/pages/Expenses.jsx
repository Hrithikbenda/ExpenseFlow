import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import ExpenseForm from "../components/Expenseform";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] =
    useState("");
  const [editingExpense, setEditingExpense] =
    useState(null);

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

  const updateExpense = async (
    id,
    updatedExpense
  ) => {
    try {
      await axios.put(
        `http://localhost:8080/expenses/${id}`,
        updatedExpense
      );

      fetchExpenses();
      setEditingExpense(null);
    } catch (error) {
      console.error(
        "Error updating expense:",
        error
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/expenses/${id}`
      );

      fetchExpenses();
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error
      );
    }
  };

  const totalItems = expenses.length;

  const totalSpent = expenses.reduce(
    (sum, expense) =>
      sum + expense.amount,
    0
  );

  const filteredExpenses =
    expenses.filter((expense) => {
      const matchesSearch =
        expense.category
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =
        filterCategory === "" ||
        expense.category ===
          filterCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-5xl font-bold mb-8">
          💳 Expenses
        </h1>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div
            className="
              bg-white/10
              backdrop-blur-xl
              border border-white/20
              rounded-3xl
              p-6
            "
          >
            <h3 className="text-gray-300">
              📋 Total Expenses
            </h3>

            <p className="text-4xl font-bold mt-3">
              {totalItems}
            </p>
          </div>

          <div
            className="
              bg-white/10
              backdrop-blur-xl
              border border-white/20
              rounded-3xl
              p-6
            "
          >
            <h3 className="text-gray-300">
              💰 Total Spending
            </h3>

            <p className="text-4xl font-bold mt-3">
              ₹{totalSpent.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Edit Form */}
        {editingExpense && (
          <div className="mb-8">
            <ExpenseForm
              editingExpense={
                editingExpense
              }
              onUpdateExpense={
                updateExpense
              }
            />
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search category..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="
              p-3
              rounded-xl
              bg-white/10
              border border-white/20
              text-white
              placeholder-gray-300
            "
          />

          <select
            value={filterCategory}
            onChange={(e) =>
              setFilterCategory(
                e.target.value
              )
            }
            className="
              p-3
              rounded-xl
              bg-white
              text-black
              border border-gray-300
              min-w-[180px]
            "
          >
            <option value="">
              All Categories
            </option>

            <option value="Food">
              🍔 Food
            </option>

            <option value="Travel">
              ✈️ Travel
            </option>

            <option value="Shopping">
              🛍 Shopping
            </option>

            <option value="Bills">
              📄 Bills
            </option>

            <option value="Entertainment">
              🎬 Entertainment
            </option>

            <option value="Health">
              🏥 Health
            </option>
          </select>
        </div>

        <h2 className="text-3xl font-bold mb-4">
          📋 All Expenses
        </h2>

        {/* Expense List */}
        <div className="space-y-3">
          {filteredExpenses.map(
            (expense) => (
              <div
                key={expense.id}
                className="
                  bg-white/10
                  backdrop-blur-xl
                  border border-white/20
                  rounded-xl
                  p-4
                  flex
                  justify-between
                  items-center
                "
              >
                <span>
                  ₹{expense.amount} —{" "}
                  {expense.category} —{" "}
                  {expense.date}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setEditingExpense(
                        expense
                      )
                    }
                    className="
                      bg-yellow-500
                      hover:bg-yellow-600
                      px-4
                      py-2
                      rounded-lg
                      text-white
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteExpense(
                        expense.id
                      )
                    }
                    className="
                      bg-red-500
                      hover:bg-red-600
                      px-4
                      py-2
                      rounded-lg
                      text-white
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}

          {filteredExpenses.length ===
            0 && (
            <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center text-gray-300">
              📭 No expenses found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Expenses;