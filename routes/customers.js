const express = require("express");
const Customer = require("../models/Customer");
const auth = require("../middleware/auth");

const router = express.Router();

// Customer list
router.get("/", auth, async (req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });
  res.render("customers/list", {
  title: "Customers",
  customers
});
});

// Add customer form
router.get("/add", auth, (req, res) => {
  res.render("customers/add", {
  title: "Customers"
});
});

// Save customer
router.post("/add", auth, async (req, res) => {
  const { name, mobile, address, tiffinType, monthlyRate } = req.body;

  await Customer.create({
    name,
    mobile,
    address,
    tiffinType,
    monthlyRate
  });

  res.redirect("/customers");
});

// Pause / Resume customer
router.get("/toggle/:id", auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  customer.status = customer.status === "Active" ? "Paused" : "Active";
  await customer.save();
  res.redirect("/customers");
});

module.exports = router;
