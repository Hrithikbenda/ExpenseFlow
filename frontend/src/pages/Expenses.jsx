import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Sidebar from "../components/Sidebar";
import ExpenseForm from "../components/Expenseform";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      const response = await axios.get(
        `http://localhost:8080/expenses/${userEmail}`
      );

      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

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
      sum + Number(expense.amount),
    0
  );

  const exportPDF = () => {
    const doc = new jsPDF();

    const userEmail =
      localStorage.getItem("userEmail");

    doc.setFontSize(18);
    doc.text(
      "ExpenseFlow Report",
      14,
      20
    );

    doc.setFontSize(11);

    doc.text(
      `User: ${userEmail}`,
      14,
      30
    );

    doc.text(
      `Generated: ${new Date().toLocaleDateString()}`,
      14,
      38
    );

    doc.text(
      `Total Expenses: ${totalItems}`,
      14,
      46
    );

    doc.text(
      `Total Spending: Rs. ${totalSpent.toFixed(
        2
      )}`,
      14,
      54
    );

    autoTable(doc, {
      startY: 65,
      head: [
        [
          "Category",
          "Amount",
          "Note",
          "Date",
        ],
      ],
      body: expenses.map((expense) => [
        expense.category,
        `Rs. ${Number(
          expense.amount
        ).toFixed(2)}`,
        expense.note || "-",
        expense.date,
      ]),
    });

    doc.save("ExpenseFlow_Report.pdf");
  };

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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold">
            💳 Expenses
          </h1>

          <button
            onClick={exportPDF}
            className="
              bg-green-600
              hover:bg-green-700
              px-6
              py-3
              rounded-xl
              font-bold
              text-white
              transition
            "
          >
            📄 Export PDF
          </button>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h3 className="text-gray-300">
              📋 Total Expenses
            </h3>

            <p className="text-4xl font-bold mt-3">
              {totalItems}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h3 className="text-gray-300">
              💰 Total Spending
            </h3>

            <p className="text-4xl font-bold mt-3 text-green-400">
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
        <div className="flex flex-wrap gap-4 mb-8">
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
            "
          >
            <option value="">
              All Categories
            </option>

            <option value="Food">
              🍔 Food
            </option>

            <option value="Travel">
              ✈ Travel
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

        {/* Expense History */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-3xl font-bold">
              📋 Expense History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/10">
                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Note
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>

                  <th className="p-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map(
                  (expense) => (
                    <tr
                      key={expense.id}
                      className="
                        border-t
                        border-white/10
                        hover:bg-white/5
                        transition
                      "
                    >
                      <td className="p-4">
                        {expense.category}
                      </td>

                      <td className="p-4 font-bold text-green-400">
                        ₹{expense.amount}
                      </td>

                      <td className="p-4">
                        {expense.note || "-"}
                      </td>

                      <td className="p-4">
                        {expense.date}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
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
                            ✏ Edit
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
                            🗑 Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {filteredExpenses.length ===
              0 && (
              <div className="p-8 text-center text-gray-300">
                📭 No expenses found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenses;