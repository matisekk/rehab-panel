import { Router } from "express";
import { requireAuth } from "../auth/auth";
import { getMyPlanHandler, getMyDashboardHandler } from "./plan.controller";

const router = Router();

router.get("/plan", requireAuth, getMyPlanHandler);
router.get("/dashboard", requireAuth, getMyDashboardHandler);

export default router;