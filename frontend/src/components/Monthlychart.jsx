import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function MonthlyChart({ expenses }) {
  const monthlyTotals = {};

  expenses.forEach((expense) => {
    const month = new Date(
      expense.date
    ).toLocaleString("default", {
      month: "short",
    });

    monthlyTotals[month] =
      (monthlyTotals[month] || 0) +
      expense.amount;
  });

  const chartData = Object.keys(
    monthlyTotals
  ).map((month) => ({
    month,
    amount: monthlyTotals[month],
  }));

  return (
    <div
      className="
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-3xl
        p-6
        shadow-2xl
      "
    >
      <h2 className="text-2xl font-bold text-white mb-4">
        📈 Monthly Spending
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#ffffff20"
          />

          <XAxis
            dataKey="month"
            stroke="#d1d5db"
          />

          <YAxis
            stroke="#d1d5db"
          />

          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#3B82F6"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;