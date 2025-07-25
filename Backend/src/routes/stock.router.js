import { Router } from "express";
import {
  addStock,
  getAllStock,
  getSingleStock,
  updateStock,
  deleteStock,
} from "../controllers/stock.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";
import validateMongoId from "../middlewares/validateMongoId.js";

const router = Router();

// Add stock — only accessible to kiran, hiren, apoorv
router.post("/", verifyToken, checkRole("kiran", "hiren", "apoorv"), addStock);

// Get all stock — accessible to all verified admins
router.get("/", verifyToken, getAllStock);

// Get stock by ID
router.get("/:id", verifyToken, validateMongoId, getSingleStock);

// Update stock — only hiren and apoorv
router.put("/:id", verifyToken, validateMongoId, checkRole("hiren", "apoorv"), updateStock);

// Delete stock — only hiren and apoorv
router.delete("/:id", verifyToken, validateMongoId, checkRole("hiren", "apoorv"), deleteStock);

export default router;
