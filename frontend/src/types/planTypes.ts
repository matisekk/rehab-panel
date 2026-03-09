export type PlanExerciseStatus = "todo" | "in_progress" | "done";

export type ExerciseResistance = "none" | "light" | "medium" | "high";

export type PlanExercise = {
    id: string;
    order: number;
    name: string;
    deviceName: string;
    durationSec: number;
    parameters: string[];
    instructions: string;
    status: PlanExerciseStatus;
    startedAt?: string;
    endedAt?: string;
    imageUrl?: string;
};

type PlanData = {
    id: string;
    patientId: string;
    title: string;
    items: PlanExercise[];
}

export type PlanResponse = {
    patient: { id: string; name: string };
    plan: PlanData | null
};