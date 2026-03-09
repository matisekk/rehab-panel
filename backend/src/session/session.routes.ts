import { Router } from "express";
import { requireAuth } from "../auth/auth";
import { finishSessionHandler, startSessionHandler } from "./session.constroller";

const router = Router();

router.post("/sessions", requireAuth, startSessionHandler);
router.post("/sessions/:id/finish", requireAuth, finishSessionHandler);

export default router;