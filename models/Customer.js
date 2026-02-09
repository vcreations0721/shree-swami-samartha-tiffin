const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String },
  tiffinType: { type: String, enum: ["Lunch", "Dinner", "Both"], required: true },
  monthlyRate: { type: Number, required: true },
  status: { type: String, default: "Active" }, // Active / Paused
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Customer", CustomerSchema);
