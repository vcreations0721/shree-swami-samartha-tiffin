const express = require("express");
const Payment = require("../models/Payment");
const Customer = require("../models/Customer");
const auth = require("../middleware/auth");

const router = express.Router();

// Payment list
router.get("/", auth, async (req, res) => {
  const payments = await Payment.find()
    .populate("customer")
    .sort({ date: -1 });

  res.render("payments/list", {
  title: "Payments",
  payments
});
});

// Add payment form
router.get("/add", auth, async (req, res) => {
  const customers = await Customer.find({ status: "Active" });

  res.render("payments/add", {
    title: "Payments",
    customers
  });
});


// Save payment
router.post("/add", auth, async (req, res) => {
  const { customer, paymentType, month, amount, mode } = req.body;

  await Payment.create({
    customer,
    paymentType,
    month: paymentType === "Monthly" ? month : "",
    amount,
    mode
  });

  res.redirect("/payments");
});

module.exports = router;
