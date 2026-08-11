import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/SummaryCard";
import TransactionCard from "../components/TransactionCard";
import AddExpenseModal from "../components/AddExpenseModal";

function Dashboard() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async () => {
    await fetchTransactions();
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      transaction.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

  const balance = income - expense;

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <SummaryCard
          title="Total Balance"
          amount={balance}
          color="text-blue-600"
        />

        <SummaryCard
          title="Income"
          amount={income}
          color="text-green-600"
        />

        <SummaryCard
          title="Expense"
          amount={expense}
          color="text-red-600"
        />

      </div>

      <div className="mt-10">

        <div className="flex justify-between items-center mb-5">

          <div className="flex justify-between items-center w-full">

            <h2 className="text-2xl font-bold">
              Recent Transactions
            </h2>

            <button
              onClick={() =>
                navigate("/transactions")
              }
              className="text-blue-600 font-semibold hover:underline"
            >
              View All →
            </button>

          </div>

          <button
            onClick={() => {
              setEditingTransaction(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Expense
          </button>

        </div>

        <div className="mb-6">

          <input
            type="text"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-80 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div className="space-y-4">
                    {filteredTransactions.length === 0 ? (
            <p className="text-center text-gray-500">
              No transactions found.
            </p>
          ) : (
            filteredTransactions
              .slice(0, 5)
              .map((transaction) => (
                <TransactionCard
                  key={transaction._id}
                  title={transaction.title}
                  category={transaction.category}
                  amount={transaction.amount}
                  type={transaction.type}
                  date={new Date(
                    transaction.date
                  ).toLocaleDateString()}
                  onDelete={() =>
                    handleDeleteTransaction(
                      transaction._id
                    )
                  }
                  onEdit={() =>
                    handleEditTransaction(
                      transaction
                    )
                  }
                />
              ))
          )}

        </div>

      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddTransaction}
        editData={editingTransaction}
      />

    </MainLayout>
  );
}

export default Dashboard;