export type ProgressStatus = "completed" | "missed";

export type ProgressItem = {
  date: string;
  status: ProgressStatus;
};

export type DashboardData = {
  goalTitle: string;
  estimatedMinutes: number;
  timeSpentMinutes: number;
  currentStreakDays: number;
  completedSessions: number;
  weeklyProgress: ProgressItem[];
  rehabHistory: ProgressItem[];
  tipOfTheDay: string;
};

export type DashboardResponse = {
  patient: { id: string; name: string };
  dashboard: DashboardData | null;
  totalExercises: number;
  completedExercises: number;
};