const Transaction = require("../models/transaction");
const mongoose = require("mongoose");

// ✅ Add a new Transaction
exports.addTransaction = async (req, res) => {
    try {
        const { userId, amount, type, category, description, date, paymentMethod } = req.body;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const newTransaction = new Transaction({
            userId: new mongoose.Types.ObjectId(userId),
            amount,
            type,
            category,
            description,
            date: date ? new Date(date) : Date.now(),
            paymentMethod,
        });

        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get Transactions by User
exports.getTransactions = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const transactions = await Transaction.find({ userId }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Delete Transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid transaction ID format" });
        }

        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Server error" });
    }
};
