import type { Request, Response } from "express";
import { getUserFromRequest } from "../auth/auth";
import { getPatientById, getPatientDashboard, getPatientPlan } from "../data";

export function getMyPlanHandler(req: Request, res: Response) {
  const user = getUserFromRequest(req);
  if (!user) return res.status(404).json({ error: "User not found" });

  const patient = getPatientById(user.patientId);
  if (!patient) return res.status(404).json({ error: "Patient not found" });

  const plan = getPatientPlan(user.patientId);

  return res.json({
    patient,
    plan: plan ?? null,
  });
}

export function getMyDashboardHandler(req: Request, res: Response) {
  const user = getUserFromRequest(req);
  if (!user) return res.status(404).json({ error: "User not found" });

  const patient = getPatientById(user.patientId);
  if (!patient) return res.status(404).json({ error: "Patient not found" });

  const plan = getPatientPlan(user.patientId);
  const dashboard = getPatientDashboard(user.patientId);

  const totalExercises = plan?.items.length ?? 0;
  const completedExercises =
    plan?.items.filter((item) => item.status === "done").length ?? 0;

  return res.json({
    patient,
    dashboard: dashboard ?? null,
    totalExercises,
    completedExercises,
  });
}