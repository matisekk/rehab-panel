import type { Request, Response } from "express";
import { getUserFromRequest } from "../auth/auth";
import { getPatientById } from "../data";

export function getMeHandler(req: Request, res: Response) {
  const user = getUserFromRequest(req);
  if (!user) return res.status(404).json({ error: "User not found" });

  return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
}

export function updateMeHandler(req: Request, res: Response) {
  const user = getUserFromRequest(req);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { firstName, lastName } = req.body ?? {};

  if (!firstName || !lastName) {
    return res.status(400).json({
      error: "First name and last name are required",
    });
  }

  user.firstName = firstName;
  user.lastName = lastName;

  const patient = getPatientById(user.patientId);
  if (patient) {
    patient.name = `${firstName} ${lastName}`;
  }

  return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
}

export function updatePasswordHandler(req: Request, res: Response) {
  const user = getUserFromRequest(req);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { oldPassword, newPassword } = req.body ?? {};

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      error: "Current and new password are required",
    });
  }

  if (user.password !== oldPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  if (typeof newPassword !== "string" || newPassword.length < 6) {
    return res.status(400).json({
      error: "New password must be at least 6 characters long",
    });
  }

  user.password = newPassword;

  return res.status(204).end();
}