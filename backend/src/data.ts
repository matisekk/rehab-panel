import type {
  User,
  Session,
  ExerciseStatus,
  Exercise,
  Plan,
  Dashboard,
  Patient,
} from "./models";

export const patients = [
  {
    id: "1",
    name: "Jan Kowalski",
  },
  {
    id: "2",
    name: "Anna Nowak",
  },
  {
    id: "3",
    name: "Piotr Wiśniewski",
  }
];

export const plans: Plan[] = [
  {
    id: "plan-1",
    patientId: "1",
    title: "Shoulder rehabilitation plan",
    items: [
      {
        id: "ex-1",
        order: 1,
        name: "Shoulder rotation exercise",
        deviceName: "Upper limb rotor",
        durationSec: 15,
        parameters: ["Time: 15 s", "Resistance: light"],
        instructions: "Perform slow and even shoulder rotations for 15 seconds.",
        status: "in_progress",
        startedAt: "2026-03-09T10:15:22Z",
        imageUrl: "/images/exercises/shoulder-rotation.png",
      },
      {
        id: "ex-2",
        order: 2,
        name: "Shoulder pulley stretch",
        deviceName: "Shoulder pulley",
        durationSec: 15,
        parameters: ["Time: 15 s", "Resistance: medium"],
        instructions: "Move the arm through a comfortable range using the pulley.",
        status: "todo",
        imageUrl: "/images/exercises/shoulder-pully.png",
      },
      {
        id: "ex-3",
        order: 3,
        name: "Shoulder strengthening pull",
        deviceName: "Resistance band",
        durationSec: 15,
        parameters: ["Time: 15 s", "Resistance: medium"],
        instructions: "Pull the band in a steady and controlled motion without pain.",
        status: "todo",
        imageUrl: "/images/exercises/shoulder-pull.png",
      },
    ],
  },
  {
    id: "plan-2",
    patientId: "2",
    title: "Knee rehabilitation plan",
    items: [
      {
        id: "ex-4",
        order: 1,
        name: "Quadriceps activation",
        deviceName: "Rehabilitation mat",
        durationSec: 15,
        parameters: ["Time: 15 s", "Resistance: light"],
        instructions: "Tighten the front thigh muscles, hold briefly, then relax.",
        status: "todo",
        imageUrl: "/images/exercises/quadriceps-activation.png",
      },
      {
        id: "ex-5",
        order: 2,
        name: "Heel slide exercise",
        deviceName: "Rehabilitation mat",
        durationSec: 15,
        parameters: ["Time: 15 s"],
        instructions: "Slide the heel toward the body and return slowly.",
        status: "todo",
        imageUrl: "/images/exercises/heel-slide.png",
      },
      {
        id: "ex-6",
        order: 3,
        name: "Step-up training",
        deviceName: "Rehab step platform",
        durationSec: 15,
        parameters: ["Time: 15 s", "Resistance: medium"],
        instructions: "Step up and down in a controlled way using support if needed.",
        status: "todo",
        imageUrl: "/images/exercises/step-platform.png",
      },
    ],
  },
  {
    id: "plan-3",
    patientId: "3",
    title: "Ankle rehabilitation plan",
    items: [
      {
        id: "ex-7",
        order: 1,
        name: "Ankle flexion exercise",
        deviceName: "Rehabilitation chair",
        durationSec: 15,
        parameters: ["Time: 15 s"],
        instructions: "Move the foot up and down slowly in a comfortable range.",
        status: "todo",
        imageUrl: "/images/exercises/ankle-flexion.png",
      },
      {
        id: "ex-8",
        order: 2,
        name: "Ankle circle exercise",
        deviceName: "Rehabilitation chair",
        durationSec: 15,
        parameters: ["Time: 15 s"],
        instructions: "Rotate the ankle slowly in both directions.",
        status: "todo",
        imageUrl: "/images/exercises/ankle-circle.png",
      },
      {
        id: "ex-9",
        order: 3,
        name: "Heel raise exercise",
        deviceName: "Balance support bar",
        durationSec: 15,
        parameters: ["Time: 15 s", "Resistance: light"],
        instructions: "Raise the heels off the floor and lower them slowly.",
        status: "todo",
        imageUrl: "/images/exercises/heel-raise.png",
      },
    ],
  },
];

export const dashboards: Dashboard[] = [
  {
    patientId: "1",
    goalTitle: "Complete all exercises",
    estimatedMinutes: 5,
    timeSpentMinutes: 3,
    currentStreakDays: 4,
    completedSessions: 9,
    weeklyProgress: [
      { date: "2026-02-23", status: "completed" },
      { date: "2026-02-22", status: "completed" },
      { date: "2026-02-21", status: "missed" },
      { date: "2026-02-20", status: "completed" },
    ],
    rehabHistory: [
      { date: "2026-02-23", status: "completed" },
      { date: "2026-02-22", status: "completed" },
      { date: "2026-02-21", status: "missed" },
      { date: "2026-02-20", status: "completed" },
    ],
    tipOfTheDay:
      "Keep your shoulder relaxed and avoid compensation during each repetition.",
  },
  {
    patientId: "2",
    goalTitle: "Improve knee stability",
    estimatedMinutes: 10,
    timeSpentMinutes: 2,
    currentStreakDays: 2,
    completedSessions: 3,
    weeklyProgress: [
      { date: "2026-02-23", status: "completed" },
      { date: "2026-02-22", status: "missed" },
      { date: "2026-02-21", status: "completed" },
      { date: "2026-02-20", status: "completed" },
    ],
    rehabHistory: [
      { date: "2026-02-23", status: "completed" },
      { date: "2026-02-22", status: "missed" },
      { date: "2026-02-21", status: "completed" },
      { date: "2026-02-20", status: "completed" },
    ],
    tipOfTheDay:
      "Avoid sudden changes of direction and deep squats while your knee is healing.",
  },
  {
    patientId: "3",
    goalTitle: "Improve ankle mobility",
    estimatedMinutes: 5,
    timeSpentMinutes: 0,
    currentStreakDays: 1,
    completedSessions: 1,
    weeklyProgress: [
      { date: "2026-02-23", status: "completed" },
      { date: "2026-02-22", status: "missed" },
      { date: "2026-02-21", status: "missed" },
      { date: "2026-02-20", status: "completed" },
    ],
    rehabHistory: [
      { date: "2026-02-23", status: "completed" },
      { date: "2026-02-22", status: "missed" },
      { date: "2026-02-21", status: "missed" },
      { date: "2026-02-20", status: "completed" },
    ],
    tipOfTheDay:
      "Move slowly and avoid pushing into pain while rebuilding ankle mobility.",
  }
];

export const users: User[] = [
  {
    id: "u-1",
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jan@test.com",
    password: "Test1234!",
    patientId: "1",
  },
  {
    id: "u-2",
    firstName: "Anna",
    lastName: "Nowak",
    email: "anna@test.com",
    password: "Test1234!",
    patientId: "2",
  },
  {
    id: "u-3",
    firstName: "Piotr",
    lastName: "Wiśniewski",
    email: "piotr@test.com",
    password: "Test1234!",
    patientId: "3",
  }
];

export const sessions = new Map<string, Session>();

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getPatientById(patientId: string) {
  return patients.find((patient) => patient.id === patientId) ?? null;
}

export function getPatientPlan(patientId: string): Plan | null {
  return plans.find((plan) => plan.patientId === patientId) ?? null;
}

export function getPatientDashboard(patientId: string): Dashboard | null {
  return dashboards.find((dashboard) => dashboard.patientId === patientId) ?? null;
}

export function getExerciseById(exerciseId: string): Exercise | undefined {
  for (const plan of plans) {
    const exercise = plan.items.find((item) => item.id === exerciseId);
    if (exercise) return exercise;
  }
  return undefined;
}

export function assertCanStartExercise(
  exercise: Exercise,
): { ok: true } | { ok: false; reason: string } {
  const status: ExerciseStatus = exercise.status;
  if (status === "done") {
    return { ok: false, reason: "Exercise has already been completed" };
  }
  return { ok: true };
}

export function addUser(user: User): void {
  users.push(user);
}

export function addPatient(patient: Patient): void {
  patients.push(patient);
}