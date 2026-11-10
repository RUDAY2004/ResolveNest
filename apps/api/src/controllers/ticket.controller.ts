
import type { Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

const createTicketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must contain at least 5 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters"),

  priority: z
    .enum(["LOW", "MEDIUM", "HIGH", "URGENT"])
    .optional(),
});

export async function createTicket(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  try {
    const validation = createTicketSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      });
      return;
    }

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const { title, description, priority } = validation.data;

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        priority: priority ?? "MEDIUM",
        customerId: req.user.userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        customerId: true,
        assignedAgentId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error("Create ticket error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the ticket",
    });
  }
}
