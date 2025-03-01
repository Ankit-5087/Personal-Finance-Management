const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["income", "expense"], 
        required: true, 
        lowercase: true  // ✅ Automatically converts values like "Income", "Expense" to lowercase
    },
    category: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Create and export the model
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
