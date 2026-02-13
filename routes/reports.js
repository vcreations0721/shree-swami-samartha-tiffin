const express = require("express");
const Payment = require("../models/Payment");
const Expense = require("../models/Expense");
const Customer = require("../models/Customer");
const auth = require("../middleware/auth");

const router = express.Router();

/* =========================
   MONTHLY REPORT
========================= */
router.get("/monthly", auth, async (req, res) => {
  const month = req.query.month;

  let startDate, endDate;
  if (month) {
    startDate = new Date(month + "-01");
    endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
  }

  const income = month
    ? await Payment.aggregate([
        { $match: { date: { $gte: startDate, $lt: endDate } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ])
    : [];

  const expense = month
    ? await Expense.aggregate([
        { $match: { date: { $gte: startDate, $lt: endDate } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ])
    : [];

  const totalIncome = income[0]?.total || 0;
  const totalExpense = expense[0]?.total || 0;

  res.render("reports/monthly", {
    title: "Reports",
    totalIncome,
    totalExpense,
    profit: totalIncome - totalExpense
  });
});


/* =========================
   CUSTOMER-WISE REPORT
========================= */
router.get("/customers", auth, async (req, res) => {
  const customers = await Customer.find();

  const report = [];
  for (let c of customers) {
    const totalPaid = await Payment.aggregate([
      { $match: { customer: c._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    report.push({
      name: c.name,
      mobile: c.mobile,
      totalPaid: totalPaid[0]?.total || 0
    });
  }

  res.render("reports/customers", {
  title: "Reports",
  reportData: report
});
});

module.exports = router;
