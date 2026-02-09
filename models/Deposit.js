const mongoose = require("mongoose");

const DepositSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    enum: ["Cash", "UPI", "Bank"],
    required: true
  },
  refunded: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Deposit", DepositSchema);
