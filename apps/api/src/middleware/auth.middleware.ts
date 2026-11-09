
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: "CUSTOMER" | "AGENT" | "ADMIN";
  };
}

interface JwtPayload {
  userId: string;
  role: "CUSTOMER" | "AGENT" | "ADMIN";
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Access token is required",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access token is required",
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      res.status(500).json({
        success: false,
        message: "Authentication configuration error",
      });
      return;
    }

    const decoded = jwt.verify(token, jwtSecret);

    if (
      typeof decoded === "string" ||
      !decoded ||
      typeof decoded !== "object" ||
      !("userId" in decoded) ||
      !("role" in decoded)
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
      return;
    }

    const payload = decoded as JwtPayload;

    if (
      typeof payload.userId !== "string" ||
      !["CUSTOMER", "AGENT", "ADMIN"].includes(payload.role)
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
      return;
    }

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: "Access token has expired",
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: "Invalid access token",
    });
  }
}
