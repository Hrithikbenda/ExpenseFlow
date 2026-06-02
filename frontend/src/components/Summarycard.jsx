function SummaryCard({ title, amount }) {
  const getIcon = () => {
  if (title === "Total Expenses") return "💳";
  if (title === "This Month") return "📅";
  if (title === "Total Transactions") return "📊";
  return "💰";
};

  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-6
      w-80
      shadow-xl
      hover:scale-105
      transition-all
      duration-300
      "
    >
      <div className="flex justify-between items-center">
        <h3 className="text-gray-600 text-lg">
          {title}
        </h3>

        <span className="text-3xl">
          {getIcon()}
        </span>
      </div>

    <p className="text-5xl font-bold text-black mt-4">
  {title === "Total Transactions"
    ? amount
    : `₹${amount}`}
</p>

      <p className="text-green-500 mt-4">
        ↗ Live Updated
      </p>
    </div>
  );
}

export default SummaryCard;