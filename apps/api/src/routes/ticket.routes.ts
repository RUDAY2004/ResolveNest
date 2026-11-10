
import { Router } from "express";
import { createTicket } from "../controllers/ticket.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("CUSTOMER"),
  createTicket,
);

export default router;
