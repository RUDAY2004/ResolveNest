
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to ResolveNest API",
    status: "running"
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "ResolveNest API is healthy"
  });
});

export default app;
