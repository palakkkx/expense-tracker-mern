import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/SummaryCard";
import TransactionCard from "../components/TransactionCard";
import AddExpenseModal from "../components/AddExpenseModal";
import transactionsData from "../data/transactions";

function Dashboard() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };
  const handleDeleteTransaction = (id) => {
  setTransactions(
    transactions.filter((transaction) => transaction.id !== id)
  );
};

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

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
          <h2 className="text-2xl font-bold">Recent Transactions</h2>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Expense
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full md:w-80 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionCard
  key={transaction.id}
  title={transaction.title}
  category={transaction.category}
  amount={transaction.amount}
  type={transaction.type}
  date={transaction.date}
  onDelete={() => handleDeleteTransaction(transaction.id)}
/>
          ))}
        </div>
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />
    </MainLayout>
  );
}

export default Dashboard;