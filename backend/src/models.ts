export type ExerciseStatus = "todo" | "in_progress" | "done";
export type ExerciseResistance = "none" | "light" | "medium" | "high";
export type ProgressStatus = "completed" | "missed";
export type SessionStatus = "running" | "finished";

export type Exercise = {
  id: string;
  order: number;
  name: string;
  deviceName: string;
  durationSec: number;
  parameters: string[];
  instructions: string;
  status: ExerciseStatus;
  startedAt?: string;
  endedAt?: string;
  imageUrl?: string;
};

export type Plan = {
  id: string;
  patientId: string;
  title: string;
  items: Exercise[];
};

export type Patient = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  patientId: string;
};

export type Session = {
  id: string;
  patientId: string;
  exerciseId: string;
  status: SessionStatus;
  startedAt: number;
  endedAt?: number;
  progress: number;
};

export type ProgressEntry = {
  date: string;
  status: ProgressStatus;
};

export type Dashboard = {
  patientId: string;
  goalTitle: string;
  estimatedMinutes: number;
  timeSpentMinutes: number;
  currentStreakDays: number;
  completedSessions: number;
  weeklyProgress: ProgressEntry[];
  rehabHistory: ProgressEntry[];
  tipOfTheDay: string;
};