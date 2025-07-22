import { Router } from "express";
import {
  createStock,
  getAllStock,
  getSingleStock,
  updateStock,
  deleteStock
} from "../controllers/stock.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Create a new stock
router.post("/create", verifyToken, createStock);

// Get all stocks
router.get("/all", verifyToken, getAllStock);

// Get a single stock by ID
router.get("/:id", verifyToken, getSingleStock);

// Update stock by ID
router.put("/update/:id", verifyToken, updateStock);

// Delete stock by ID
router.delete("/delete/:id", verifyToken, deleteStock);

export default router;
