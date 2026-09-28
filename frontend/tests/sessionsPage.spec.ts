import test, { expect } from "@playwright/test";
import { createLoginPage } from "./pages/LoginPage";
import { createExerciseFlow } from "./pages/exerciseFlow";
import { createSessionsPage } from "./pages/sessionsPage";

test.describe("Exercise Session", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = createLoginPage(page);
        await loginPage.goto();
        await loginPage.login({ email: "jan@test.com", password: "Test1234!" });

        await expect(page).toHaveURL("http://localhost:5173/app/dashboard");

        const exerciseFlow = createExerciseFlow(page);
        await exerciseFlow.openAvailableExerciseSession();

        await expect(page).toHaveURL(/\/sessions\/.+$/);
    })

    //Check elements on page
    test("should have correct elements", async ({ page }) => {
        const sessionPage = createSessionsPage(page);

        await expect(sessionPage.sessionHeading).toBeVisible();
        await expect(sessionPage.statusBadge).toBeVisible();
        await expect(sessionPage.finishButton).toBeVisible();
    })

    test("should keep exercise in progress after returning to dashboard", async ({ page }) => {
        const sessionPage = createSessionsPage(page);
        await sessionPage.goBackBeforeFinishExercise();

        await expect(page).toHaveURL("http://localhost:5173/app/dashboard")

        const exerciseFlow = createExerciseFlow(page);
        const firstExerciseStatusBadge = exerciseFlow.getExerciseStatus(0);
        await expect(firstExerciseStatusBadge).toBeVisible();
        await expect(firstExerciseStatusBadge).toHaveText(/in progress/i);
    })

    test("should update progress during exercise session", async ({ page }) => {
        const sessionPage = createSessionsPage(page);


        await expect(sessionPage.progressBar).toBeVisible();

        const initialProgress = Number(await sessionPage.progressBar.getAttribute("aria-valuenow"));

        await expect.poll(() => sessionPage.getProgress()).toBeGreaterThan(initialProgress);
    })

    test("should finish exercise session", async ({ page }) => {
        const sessionPage = createSessionsPage(page);

        await expect(sessionPage.progressBar).toBeVisible();

        await sessionPage.finishSession();

        await expect(sessionPage.progressBar).toHaveAttribute("aria-valuenow", "100");

        await expect(sessionPage.statusBadge.filter({ hasText: /completed/i })).toBeVisible();
    })
});