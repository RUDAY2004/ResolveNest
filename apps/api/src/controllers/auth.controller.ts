
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import prisma from "../lib/prisma.js";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export async function register(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      });
      return;
    }

    const { name, email, password } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while registering",
    });
  }
}
