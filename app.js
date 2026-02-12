require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB();

// View engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Routes (ALL routes before listen)
app.use("/", require("./routes/auth"));
app.use("/customers", require("./routes/customers"));
app.use("/payments", require("./routes/payments"));
app.use("/expenses", require("./routes/expenses"));
app.use("/deposits", require("./routes/deposits"));
app.use("/reports", require("./routes/reports"));

// Default redirect
app.get("/", (req, res) => {
  res.redirect("/login");
});

// ✅ Correct port handling for Railway
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
