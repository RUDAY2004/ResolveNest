
import { Router } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { register, login } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Authenticated user test endpoint
router.get(
  "/me",
  authenticateToken,
  (req: AuthenticatedRequest, res) => {
    res.status(200).json({
      success: true,
      message: "Authentication successful",
      user: req.user,
    });
  },
);

// Admin-only test endpoint
router.get(
  "/admin",
  authenticateToken,
  authorizeRoles("ADMIN"),
  (req: AuthenticatedRequest, res) => {
    res.status(200).json({
      success: true,
      message: "Admin access granted",
      user: req.user,
    });
  },
);

export default router;
