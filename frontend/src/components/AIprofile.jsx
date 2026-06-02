function AIProfile({ expenses }) {
  const userName =
    localStorage.getItem("username") ||
    "User";

  const totalSpent = expenses.reduce(
    (sum, expense) =>
      sum + expense.amount,
    0
  );

  const categoryTotals = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      expense.amount;
  });

  let topCategory = "N/A";
  let topAmount = 0;

  Object.keys(categoryTotals).forEach(
    (category) => {
      if (
        categoryTotals[category] >
        topAmount
      ) {
        topAmount =
          categoryTotals[category];

        topCategory = category;
      }
    }
  );

  const percentage =
    totalSpent > 0
      ? (
          (topAmount / totalSpent) *
          100
        ).toFixed(1)
      : 0;

  let message =
    "Your spending looks balanced.";

  if (percentage > 60) {
    message = `⚠ ${topCategory} spending is ${percentage}% of your expenses. Consider reducing it.`;
  } else if (percentage > 40) {
    message = `📊 ${topCategory} is your biggest category at ${percentage}% of spending.`;
  } else {
    message =
      "✅ Great job! Your spending is diversified.";
  }

  return (
    <div
      className="
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-3xl
        p-6
        flex
        items-center
        gap-6
        mb-8
      "
    >
      <div
        className="
          text-7xl
          animate-bounce
        "
      >
        🤖
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white">
          Welcome Back, {userName} 👋
        </h2>

        <p className="text-gray-300 mt-2">
          {message}
        </p>

        <div className="mt-3 flex gap-3 flex-wrap">
          <span
            className="
              bg-green-500/20
              text-green-400
              px-3
              py-1
              rounded-full
              text-sm
            "
          >
            ● AI Active
          </span>

          <span
            className="
              bg-blue-500/20
              text-blue-400
              px-3
              py-1
              rounded-full
              text-sm
            "
          >
            💰 ₹{totalSpent}
          </span>

          <span
            className="
              bg-purple-500/20
              text-purple-400
              px-3
              py-1
              rounded-full
              text-sm
            "
          >
            📊 {topCategory}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AIProfile;