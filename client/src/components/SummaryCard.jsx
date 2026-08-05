import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

function SummaryCard({ title, amount, color }) {
  const getIcon = () => {
    if (title === "Income") {
      return <ArrowUpCircle size={34} className="text-green-500" />;
    }

    if (title === "Expense") {
      return <ArrowDownCircle size={34} className="text-red-500" />;
    }

    return <Wallet size={34} className="text-blue-500" />;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-gray-100">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className={`text-3xl font-bold mt-2 ${color}`}>
            ₹ {amount}
          </h2>

        </div>

        {getIcon()}

      </div>

    </div>
  );
}

export default SummaryCard;