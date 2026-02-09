require("dotenv").config();
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

connectDB();

(async () => {
  await Admin.create({
    username: "admin",
    password: "admin123"
  });
  console.log("Admin created successfully");
  process.exit();
})();
