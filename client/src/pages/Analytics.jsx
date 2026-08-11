import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
];

function Analytics() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const highestExpense =
    Math.max(
      ...transactions
        .filter((t) => t.type === "expense")
        .map((t) => Number(t.amount)),
      0
    );

  const highestIncome =
    Math.max(
      ...transactions
        .filter((t) => t.type === "income")
        .map((t) => Number(t.amount)),
      0
    );

  const averageExpense =
    expense /
      (transactions.filter((t) => t.type === "expense").length || 1);

  const categoryMap = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + Number(t.amount);
    });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const barData = [
    {
      name: "Income",
      Amount: income,
    },
    {
      name: "Expense",
      Amount: expense,
    },
  ];

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Transactions</h3>
          <p className="text-3xl font-bold mt-2">
            {transactions.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Highest Expense</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">
            ₹{highestExpense}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Highest Income</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹{highestIncome}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Average Expense</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            ₹{averageExpense.toFixed(2)}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Income vs Expense
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Amount" />
            </BarChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Expense by Category
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>
    </MainLayout>
  );
}

export default Analytics;