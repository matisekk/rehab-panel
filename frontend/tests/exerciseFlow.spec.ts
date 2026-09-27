import test, { expect } from "@playwright/test";
import { createLoginPage } from "./pages/LoginPage";
import { createDashboardPage } from "./pages/DashboardPage";
import { createExerciseFlow } from "./pages/exerciseFlow";

test.describe("Exercise Flow", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = createLoginPage(page);
        await loginPage.goto();
        await loginPage.login({ email: "jan@test.com", password: "Test1234!" });
        await expect(page).toHaveURL("http://localhost:5173/app/dashboard");

        const dashboardPage = createDashboardPage(page);
        await expect(dashboardPage.todayPlanCard).toBeVisible();
    })

    //Check elements on page
    test("should have correct exercise and elements", async ({ page }) => {
        const exerciseFlow = createExerciseFlow(page);
        const firstExercise = exerciseFlow.exerciseCards.first();
        const exerciseHeading = exerciseFlow.getExerciseHeading(0);
        const exerciseButton = exerciseFlow.getExerciseButton(0);

        await expect(firstExercise).toBeVisible();
        await expect(exerciseHeading).toBeVisible();
        await expect(exerciseButton).toBeVisible();
    })

    test("should open exercise session", async ({ page }) => {
        const exerciseFlow = createExerciseFlow(page);

        await exerciseFlow.openFirstExerciseSession(0);
        await expect(page).toHaveURL(/\/sessions\/.+$/);
    });

    test("should display session content", async ({ page }) => {
        const exerciseFlow = createExerciseFlow(page);

        await exerciseFlow.openFirstExerciseSession(0);

        await expect(page).toHaveURL(/\/sessions\/.+$/);

        await expect(page.getByRole("heading", { name: "Exercise session" })).toBeVisible();
        await expect(page.getByText(/connecting|running/i, { exact: true })).toBeVisible();

        await expect(page.getByRole("button", { name: /finish/i })).toBeVisible();
    });

    //Negative scenarios
    test("should not allow starting completed exercise", async ({ page }) => {
        const exerciseFlow = createExerciseFlow(page);
        const completedExercise = exerciseFlow.exerciseCards.filter({ hasText: /completed/i }).first();

        await expect(completedExercise.getByRole("button")).toBeDisabled();
    });

    test("should handle invalid session id", async ({ page }) => {
        await page.goto("http://localhost:5173/sessions/invalid-session-id");

        await expect(page.getByText(/not found|error|invalid/i)).toBeVisible();
    });
})