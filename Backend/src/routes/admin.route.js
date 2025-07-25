import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  adminDashboard
} from "../controllers/admin.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = Router();

// Only super-admin can register new admin
router.route("/register").post(
  verifyToken,
  checkRole("super-admin"),
  registerAdmin
);

// Login route for all admins
router.route("/login").post(loginAdmin);

// Protected test route for checking token
router.route("/protected").get(verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Hello ${req.admin.name}, you're verified`
  });
});

// General dashboard route — accessible to all admins
router.route("/dashboard").get(verifyToken, adminDashboard);

export default router;
