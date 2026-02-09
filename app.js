require("dotenv").config();
const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB();

// View engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Routes
app.use("/", require("./routes/auth"));

// Default redirect
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
app.use("/customers", require("./routes/customers"));

app.use("/payments", require("./routes/payments"));

app.use("/expenses", require("./routes/expenses"));

app.use("/deposits", require("./routes/deposits"));

app.use("/reports", require("./routes/reports"));





