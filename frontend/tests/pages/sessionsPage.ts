import { Page } from "@playwright/test";

export const createSessionsPage = (page: Page) => {
    const sessionHeading = page.getByRole("heading", { name: "Exercise session" });
    const statusBadge = page.getByText(/connecting|running|completed/i, { exact: true })
    const finishButton = page.getByRole("button", { name: /finish/i });
    const backToDashboardLink = page.getByRole("link", { name: "Back to dashboard" });
    const progressBar = page.locator('[data-scope="progress"][data-part="track"][role="progressbar"]');
    return {
        finishSession: async () => {
            await finishButton.click();
        },
        goBackBeforeFinishExercise: async () => {
            await backToDashboardLink.click();
        },
        getProgress: async () => {
            return Number(
                await progressBar.getAttribute("aria-valuenow")
            );
        },
        sessionHeading,
        statusBadge,
        finishButton,
        backToDashboardLink,
        progressBar,
    };
};