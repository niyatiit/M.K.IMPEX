import { Router } from "express";
import {
  addStock,
  getAllStock,
  getSingleStock,
  updateStock,
  deleteStock,
} from "../controllers/stock.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/checkRole.js";

const router = Router();

// ✅ Add new stock to database
router.post(
  "/create",
  verifyToken,
  allowRoles("kiran", "hiren", "apoorv"),
  addStock
);

// ✅ Get all stock items
router.get("/all", verifyToken, getAllStock);

// ✅ Get one stock item by ID
router.get("/:id", verifyToken, getSingleStock);

// ✅ Update a stock item
router.put(
  "/update/:id",
  verifyToken,
  allowRoles("hiren", "apoorv"),
  updateStock
);

// ✅ Delete a stock item
router.delete(
  "/delete/:id",
  verifyToken,
  allowRoles("hiren", "apoorv"),
  deleteStock
);

export default router;
