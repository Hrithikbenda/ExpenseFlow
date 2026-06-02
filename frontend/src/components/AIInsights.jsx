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

  const highestCategory = Object.keys(categoryTotals).reduce(
    (a, b) =>
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

  // Spending Score
  let score = 100 - Math.round(percentage);

  if (score < 0) score = 0;

  let scoreColor = "text-green-400";
  let scoreLabel = "Excellent";

  if (score < 80) {
    scoreColor = "text-yellow-400";
    scoreLabel = "Good";
  }

  if (score < 60) {
    scoreColor = "text-orange-400";
    scoreLabel = "Moderate";
  }

  if (score < 40) {
    scoreColor = "text-red-400";
    scoreLabel = "Needs Improvement";
  }

  // Smart Recommendation
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
          <p className="text-lg">
            🏆 Spending Score:
            <span
              className={`font-bold ml-2 ${scoreColor}`}
            >
              {score}/100
            </span>
          </p>

          <p className={`${scoreColor} text-sm`}>
            {scoreLabel}
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