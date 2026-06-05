function AIInsights({ expenses }) {
  if (!expenses.length) {
    return (
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">
          🤖 AI Spending Insights
        </h2>

        <p className="text-gray-300">
          Add some expenses to generate insights.
        </p>
      </div>
    );
  }

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

  const highestCategory = Object.keys(
    categoryTotals
  ).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b]
      ? a
      : b
  );

  const highestAmount =
    categoryTotals[highestCategory];

  const percentage = (
    (highestAmount / totalSpent) *
    100
  ).toFixed(1);

  const potentialSavings = (
    highestAmount * 0.1
  ).toFixed(0);

  const yearlySavings = (
    potentialSavings * 12
  ).toFixed(0);

  let recommendation =
    "Your spending looks balanced.";

  if (highestCategory === "Food") {
    recommendation =
      "Consider reducing restaurant spending and cooking more at home.";
  }

  if (highestCategory === "Travel") {
    recommendation =
      "Plan travel budgets in advance to save more.";
  }

  if (highestCategory === "Shopping") {
    recommendation =
      "Try limiting impulse purchases this month.";
  }

  if (highestCategory === "Bills") {
    recommendation =
      "Review subscriptions and recurring payments.";
  }

  if (highestCategory === "Entertainment") {
    recommendation =
      "Consider setting a monthly entertainment budget.";
  }

  if (highestCategory === "Health") {
    recommendation =
      "Track recurring health expenses to optimize costs.";
  }

  return (
    <div
      className="
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-3xl
        p-6
        shadow-xl
      "
    >
      <h2 className="text-2xl font-bold text-white mb-5">
        🤖 AI Financial Coach
      </h2>

      <div className="space-y-4 text-gray-200">

        <p>
          💰 Total Spending:
          <span className="font-bold text-white">
            {" "}₹{totalSpent.toFixed(2)}
          </span>
        </p>

        <p>
          📊 Highest Category:
          <span className="font-bold text-white">
            {" "}{highestCategory}
          </span>
        </p>

        <p>
          📈 {highestCategory} accounts for{" "}
          <span className="font-bold text-green-400">
            {percentage}%
          </span>{" "}
          of total spending.
        </p>

        <div className="pt-2 border-t border-white/10">
  <p className="mb-3">
    💸 Potential Savings
  </p>

  <div className="flex gap-10">
    
    <div>
      <p className="text-green-400 font-bold text-2xl">
        ₹{potentialSavings}
      </p>

      <p className="text-sm text-gray-300">
        per month
      </p>
    </div>

    <div>
      <p className="text-green-300 font-bold text-2xl">
        ₹{yearlySavings}
      </p>

      <p className="text-sm text-gray-300">
        per year
      </p>
    </div>

  </div>

  <p className="text-gray-300 text-sm mt-3">
    by reducing {highestCategory} spending by 10%.
  </p>
</div>

        <div className="pt-2 border-t border-white/10">
          <p>
            💡 Recommendation:
          </p>

          <p className="text-gray-300">
            {recommendation}
          </p>
        </div>

      </div>
    </div>
  );
}

export default AIInsights;