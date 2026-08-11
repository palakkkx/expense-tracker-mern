import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import TransactionCard from "../components/TransactionCard";
import AddExpenseModal from "../components/AddExpenseModal";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState(null);

  // Fetch all transactions
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
      console.error("Fetch transactions error:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Open modal for adding
  const handleAddClick = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  // Refresh after add/edit
  const handleTransactionSaved = async () => {
    await fetchTransactions();
  };

  // Delete transaction
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

      await fetchTransactions();
    } catch (error) {
      console.error("Delete transaction error:", error);
    }
  };

  // Total income
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  // Total expense
  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  // Search + Filter
  let displayedTransactions = transactions.filter(
    (transaction) => {
      const title = transaction.title?.toLowerCase() || "";
      const category =
        transaction.category?.toLowerCase() || "";

      const searchText = search.toLowerCase();

      const matchesSearch =
        title.includes(searchText) ||
        category.includes(searchText);

      const matchesFilter =
        filter === "all" ||
        transaction.type === filter;

      return matchesSearch && matchesFilter;
    }
  );

  // Sort
  displayedTransactions = [...displayedTransactions].sort(
    (a, b) => {
      if (sort === "newest") {
        return new Date(b.date) - new Date(a.date);
      }

      if (sort === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }

      if (sort === "highest") {
        return Number(b.amount) - Number(a.amount);
      }

      if (sort === "lowest") {
        return Number(a.amount) - Number(b.amount);
      }

      return 0;
    }
  );

  return (
    <MainLayout>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your income and expenses
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          + Add Transaction
        </button>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Total Transactions
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {transactions.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Total Income
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            ₹{totalIncome}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Total Expense
          </p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            ₹{totalExpense}
          </h2>
        </div>

      </div>

      {/* Search / Filter / Sort */}

      <div className="bg-white rounded-2xl shadow p-5 mb-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search title or category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">
              All Transactions
            </option>

            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>
          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>

            <option value="highest">
              Highest Amount
            </option>

            <option value="lowest">
              Lowest Amount
            </option>
          </select>

        </div>

      </div>

      {/* Transaction List */}

      <div className="space-y-4">
                {displayedTransactions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <p className="text-gray-500 text-lg">
              No transactions found.
            </p>

            {(search || filter !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                  setSort("newest");
                }}
                className="mt-4 text-blue-600 font-semibold hover:underline"
              >
                Clear Filters
              </button>
            )}

          </div>
        ) : (
          displayedTransactions.map((transaction) => (
            <TransactionCard
              key={transaction._id}
              title={transaction.title}
              category={transaction.category}
              amount={transaction.amount}
              type={transaction.type}
              date={new Date(
                transaction.date
              ).toLocaleDateString()}
              onEdit={() =>
                handleEditTransaction(transaction)
              }
              onDelete={() =>
                handleDeleteTransaction(transaction._id)
              }
            />
          ))
        )}

      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleTransactionSaved}
        editData={editingTransaction}
      />

    </MainLayout>
  );
}

export default Transactions;