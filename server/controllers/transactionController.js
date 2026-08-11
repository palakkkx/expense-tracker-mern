const Transaction = require("../models/Transaction");

// Add Transaction
const addTransaction = async (req, res) => {
  try {
    const { title, amount, category, type, date } = req.body;

    const transaction = await Transaction.create({
      title,
      amount,
      category,
      type,
      date,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Transaction Added Successfully",
      transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const { title, amount, category, type, date } = req.body;

    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        title,
        amount,
        category,
        type,
        date,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "Transaction Updated Successfully",
      transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({
      message: "Transaction Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};