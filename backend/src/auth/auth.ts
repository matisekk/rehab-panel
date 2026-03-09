import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { users } from "../data";
import type { User } from "../models";

type TokenPayload = {
  userId: string;
};

export const tokens = new Map<string, TokenPayload>();

declare module "express-serve-static-core" {
  interface Request {
    authUserId?: string;
  }
}

export function generateToken(): string {
  return crypto.randomBytes(24).toString("hex");
}

export function generateUserId(): string {
  return crypto.randomBytes(8).toString("hex");
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No authorization token" });
  }

  const token = authHeader.slice("Bearer ".length);
  const payload = tokens.get(token);

  if (!payload) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.authUserId = payload.userId;
  next();
}

export function getUserFromRequest(req: Request): User | null {
  if (!req.authUserId) return null;
  return users.find((user) => user.id === req.authUserId) ?? null;
}