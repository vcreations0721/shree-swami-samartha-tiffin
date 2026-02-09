const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  paymentType: {
    type: String,
    enum: ["Daily", "Monthly"],
    required: true
  },
  month: {
    type: String // only for monthly payments (e.g. Jan-2026)
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", PaymentSchema);
