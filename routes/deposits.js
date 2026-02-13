const express = require("express");
const Deposit = require("../models/Deposit");
const Customer = require("../models/Customer");
const auth = require("../middleware/auth");

const router = express.Router();

// Deposit list
router.get("/", auth, async (req, res) => {
  const deposits = await Deposit.find()
    .populate("customer")
    .sort({ date: -1 });

  res.render("deposits/list", {
  title: "Deposits",
  deposits
});
});

// Add deposit form
router.get("/add", auth, async (req, res) => {
  const customers = await Customer.find({ status: "Active" });

  res.render("deposits/add", {
    title: "Deposits",
    customers
  });
});


// Save deposit
router.post("/add", auth, async (req, res) => {
  const { customer, amount, mode } = req.body;

  await Deposit.create({
    customer,
    amount,
    mode
  });

  res.redirect("/deposits");
});

// Refund toggle
router.get("/refund/:id", auth, async (req, res) => {
  const deposit = await Deposit.findById(req.params.id);
  deposit.refunded = !deposit.refunded;
  await deposit.save();
  res.redirect("/deposits");
});

module.exports = router;
