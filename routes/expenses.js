const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

// Expense list
router.get("/", auth, async (req, res) => {
  const expenses = await Expense.find().sort({ date: -1 });
  res.render("expenses/list", {
  title: "Expenses",
  expenses
});
});

// Add expense form
router.get("/add", auth, (req, res) => {
  res.render("expenses/add", {
  title: "Expenses"
});
});

// Save expense
router.post("/add", auth, async (req, res) => {
  const { category, description, amount, paidBy } = req.body;

  await Expense.create({
    category,
    description,
    amount,
    paidBy
  });

  res.redirect("/expenses");
});

module.exports = router;
