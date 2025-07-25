import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import adminRouter from "./routes/admin.route.js";
import stockRouter from "./routes/stock.router.js";
import { adminDashboard } from "./controllers/admin.controller.js";

// Dotenv config
dotenv.config({
  path: './env'
});

// App init
const app = express();

// Middleware
app.use(express.json());

// ✅ Route mounting
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/stock", stockRouter);
app.use("/api/v1/admin" , adminDashboard)

// ✅ DB connect and server start
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection failed:", err);
  });
