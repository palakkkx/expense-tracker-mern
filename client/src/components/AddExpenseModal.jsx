import { useState, useEffect } from "react";
import axios from "axios";

function AddExpenseModal({
  isOpen,
  onClose,
  onAdd,
  editData,
}) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title,
        amount: editData.amount,
        category: editData.category,
        type: editData.type,
        date: editData.date
          ? editData.date.substring(0, 10)
          : "",
      });
    } else {
      setForm({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        date: "",
      });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      amount: "",
      category: "",
      type: "expense",
      date: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editData) {
        await axios.put(
          `http://localhost:5000/api/transactions/${editData._id}`,
          {
            ...form,
            amount: Number(form.amount),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Transaction Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/transactions",
          {
            ...form,
            amount: Number(form.amount),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Transaction Added Successfully");
      }

      resetForm();
      await onAdd();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          {editData
            ? "Edit Transaction"
            : "Add Transaction"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="expense">
              Expense
            </option>
            <option value="income">
              Income
            </option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              {editData ? "Update" : "Add"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-300 py-3 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default AddExpenseModal;