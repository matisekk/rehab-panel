import type { Request, Response } from "express";
import { getUserFromRequest } from "../auth/auth";
import {
  assertCanStartExercise,
  getExerciseById,
  sessions,
} from "../data";
import type { Session } from "../models";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function startSessionHandler(req: Request, res: Response) {
  const user = getUserFromRequest(req);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { exerciseId } = req.body ?? {};
  if (!exerciseId) {
    return res.status(400).json({ error: "exerciseId required" });
  }

  const exercise = getExerciseById(exerciseId);
  if (!exercise) {
    return res.status(404).json({ error: "Exercise not found" });
  }

  const can = assertCanStartExercise(exercise);
  if (!can.ok) {
    return res.status(400).json({ error: can.reason });
  }

  const id = uid();

  const session: Session = {
    id,
    patientId: user.patientId,
    exerciseId,
    status: "running",
    startedAt: Date.now(),
    progress: 0,
  };

  sessions.set(id, session);

  if (!exercise.startedAt) {
    exercise.startedAt = new Date().toISOString();
  }
  exercise.status = "in_progress";

  return res.status(201).json({ sessionId: id });
}

export function finishSessionHandler(req: Request, res: Response) {
  const sessionId = req.params.id as string;
  const session = sessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  setTimeout(() => {
    session.status = "finished";
    session.endedAt = Date.now();
    session.progress = 1;

    const exercise = getExerciseById(session.exerciseId);
    if (exercise) {
      exercise.status = "done";
      exercise.endedAt = new Date(session.endedAt).toISOString();
    }

    return res.json({
      sessionId: session.id,
      startedAt: session.startedAt,
      endedAt: session.endedAt,
      durationSec: Math.round(
        ((session.endedAt ?? session.startedAt) - session.startedAt) / 1000,
      ),
    });
  }, 3000);
}