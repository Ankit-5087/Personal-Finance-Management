const express = require("express");
const mongoose = require("mongoose");
const Transaction = require("../models/transactionModel"); // ✅ Updated import

const router = express.Router();

// ✅ Route to Add a Transaction
router.post("/add", async (req, res) => {
    try {
        const { userId, amount, type, category, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const newTransaction = new Transaction({
            userId: new mongoose.Types.ObjectId(userId),
            amount,
            type,
            category,
            description,
        });

        await newTransaction.save();
        res.status(201).json({ message: "Transaction added successfully!" });

    } catch (error) {
        console.error("Error in /api/transactions/add:", error);
        res.status(500).json({ message: error.message });
    }
});

// ✅ Route to Get All Transactions for a User
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const transactions = await Transaction.find({ userId });
        res.status(200).json(transactions);

    } catch (error) {
        console.error("Error in /api/transactions/:userId:", error);
        res.status(500).json({ message: error.message });
    }
});

// ✅ Route to Update a Transaction
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, type, category, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid transaction ID" });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { amount, type, category, description },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json(updatedTransaction);

    } catch (error) {
        console.error("Error in /api/transactions/update/:id:", error);
        res.status(500).json({ message: error.message });
    }
});

// ✅ Route to Delete a Transaction
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid transaction ID" });
        }

        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully!" });

    } catch (error) {
        console.error("Error in /api/transactions/delete/:id:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
