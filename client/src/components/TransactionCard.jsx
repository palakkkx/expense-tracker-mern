import { Pencil, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";

function TransactionCard({
  title,
  category,
  amount,
  type,
  date,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100">

      <div className="flex justify-between items-center">

        {/* Left Section */}
        <div className="flex items-center gap-4">

          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              type === "income"
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            {type === "income" ? (
              <ArrowUpRight className="text-green-600" size={22} />
            ) : (
              <ArrowDownRight className="text-red-600" size={22} />
            )}
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              {title}
            </h2>

            <div className="flex items-center gap-2 mt-1">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                {category}
              </span>

              <span className="text-gray-400 text-sm">
                {date}
              </span>
            </div>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          <h2
            className={`text-xl font-bold ${
              type === "income"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {type === "income" ? "+" : "-"} ₹{amount}
          </h2>

          <button className="p-2 rounded-lg hover:bg-blue-100 transition">
            <Pencil size={20} className="text-blue-600" />
          </button>

          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-red-100 transition"
          >
            <Trash2 size={20} className="text-red-600" />
          </button>

        </div>

      </div>

    </div>
  );
}

export default TransactionCard;