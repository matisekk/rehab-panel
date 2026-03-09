import { Router } from "express";
import { requireAuth } from "../auth/auth";
import {
  getMeHandler,
  updateMeHandler,
  updatePasswordHandler,
} from "./me.controller";

const router = Router();

router.get("/", requireAuth, getMeHandler);
router.put("/", requireAuth, updateMeHandler);
router.put("/password", requireAuth, updatePasswordHandler);

export default router;