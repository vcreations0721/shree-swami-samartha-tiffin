const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Gas", "Vegetables", "Grocery", "Delivery", "Other"],
    required: true
  },
  description: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  paidBy: {
    type: String,
    enum: ["Cash", "UPI", "Bank"],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
