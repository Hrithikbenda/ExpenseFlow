import { useState, useEffect } from "react";

function ExpenseForm({
  onAddExpense,
  editingExpense,
  onUpdateExpense,
}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setNote(editingExpense.note || "");
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      alert("Please fill all required fields");
      return;
    }

    const expenseData = {
      amount: Number(amount),
      category,
      date,
      note,
      userEmail:
        localStorage.getItem("userEmail"),
    };

    if (editingExpense) {
      onUpdateExpense(
        editingExpense.id,
        expenseData
      );
    } else {
      onAddExpense(expenseData);
    }

    setAmount("");
    setCategory("");
    setDate("");
    setNote("");
  };

  const handleCancel = () => {
    setAmount("");
    setCategory("");
    setDate("");
    setNote("");

    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-3xl
        p-8
        shadow-2xl
        max-w-xl
      "
    >
      <h2 className="text-3xl font-bold text-white mb-6">
        {editingExpense
          ? "✏ Edit Expense"
          : "➕ Add New Expense"}
      </h2>

      <input
        type="number"
        placeholder="💰 Enter Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        className="
          w-full
          bg-white
          border border-white/20
          text-black
          p-4
          rounded-xl
          mb-4
        "
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="
          w-full
          bg-white/10
          border border-white/20
          text-white
          p-4
          rounded-xl
          mb-4
        "
      >
        <option value="" className="text-black">
          Select Category
        </option>

        <option value="Food" className="text-black">
          🍔 Food
        </option>

        <option value="Travel" className="text-black">
          ✈ Travel
        </option>

        <option value="Shopping" className="text-black">
          🛍 Shopping
        </option>

        <option value="Bills" className="text-black">
          📄 Bills
        </option>

        <option
          value="Entertainment"
          className="text-black"
        >
          🎬 Entertainment
        </option>

        <option value="Health" className="text-black">
          🏥 Health
        </option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
        className="
          w-full
          bg-white/10
          border border-white/20
          text-white
          p-4
          rounded-xl
          mb-4
        "
      />

      <textarea
        placeholder="📝 Expense Note (optional)"
        value={note}
        onChange={(e) =>
          setNote(e.target.value)
        }
        rows="3"
        className="
          w-full
          bg-white/10
          border border-white/20
          text-white
          p-4
          rounded-xl
          mb-6
          resize-none
        "
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="
            flex-1
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            hover:from-blue-700
            hover:to-purple-700
            text-white
            py-4
            rounded-xl
            font-bold
          "
        >
          {editingExpense
            ? "💾 Update Expense"
            : "➕ Add Expense"}
        </button>

        {editingExpense && (
          <button
            type="button"
            onClick={handleCancel}
            className="
              bg-gray-600
              hover:bg-gray-700
              text-white
              px-6
              rounded-xl
              font-bold
            "
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;