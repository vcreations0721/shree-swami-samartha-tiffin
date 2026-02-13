const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const auth = require("../middleware/auth");

const router = express.Router();

// Show login page
router.get("/login", (req, res) => {
  res.render("login", { layout: false });
});

// Handle login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res.send("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.send("Invalid username or password");
  }

  req.session.admin = admin._id;
  res.redirect("/dashboard");
});

// Dashboard (protected)
const Payment = require("../models/Payment");
const Expense = require("../models/Expense");

router.get("/dashboard", auth, async (req, res) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  // Income
  const todayIncome = await Payment.aggregate([
    { $match: { date: { $gte: startOfToday } } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const monthIncome = await Payment.aggregate([
    { $match: { date: { $gte: startOfMonth } } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  // Expenses
  const todayExpense = await Expense.aggregate([
    { $match: { date: { $gte: startOfToday } } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const monthExpense = await Expense.aggregate([
    { $match: { date: { $gte: startOfMonth } } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  res.render("dashboard", {
  title: "Dashboard",
  todayIncome,
  monthIncome,
  todayExpense,
  monthExpense
});
});


// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
