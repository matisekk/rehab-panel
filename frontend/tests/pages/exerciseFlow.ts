import { Page } from "@playwright/test";

export const createExerciseFlow = (page: Page) => {
    const exerciseCards = page.getByTestId(/^exercise-card-/);

    const getExerciseCard = (index: number) => {
        return exerciseCards.nth(index);
    };

    const getAvailableExerciseCard = () => {
        return exerciseCards.filter({
            has: page.getByRole("button", { name: /start|continue/i }),
        }).first();
    };

    return {
        openAvailableExerciseSession: async () => {
            const exerciseCard = getAvailableExerciseCard();
            await exerciseCard.getByRole("button", { name: /start|continue/i }).click();
        },

        getExerciseHeading: (index: number) => {
            return getExerciseCard(index).getByRole("heading");
        },

        getExerciseButton: (index: number) => {
            return getExerciseCard(index).getByRole("button", { name: /start|continue|completed/i });
        },

        getExerciseStatus: (index: number) => {
            const card = exerciseCards.nth(index);
            return card.getByTestId(/^exercise-status-/);
        },
        getAvailableExerciseCard,
        exerciseCards,
    };
};