import { test, expect } from '@playwright/test';
import { createDashboardPage } from './pages/DashboardPage';
import { createLoginPage } from './pages/LoginPage';

test.describe("Dashboard Page - authenticated", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = createLoginPage(page);
        await loginPage.goto();
        await loginPage.login({ email: "jan@test.com", password: "Test1234!" });
        await expect(page).toHaveURL("http://localhost:5173/app/dashboard");
    })

    //Check elements on page
    test("should have correct metadata and elements", async ({ page }) => {
        const dashboardPage = createDashboardPage(page);
        await expect(page).toHaveTitle("Rehab Panel");

        await expect(dashboardPage.dashboardHeading).toBeVisible();
        await expect(dashboardPage.logoutButton).toBeVisible();
        await expect(dashboardPage.userWelcomeText).toBeVisible();
        await expect(dashboardPage.changePersonalDataButton).toBeVisible();
        await expect(dashboardPage.changePasswordButton).toBeVisible();
        await expect(dashboardPage.todayGoalCard).toBeVisible();
        await expect(dashboardPage.weeklyProgresCard).toBeVisible();
        await expect(dashboardPage.tipOfTheDayCard).toBeVisible();
        await expect(dashboardPage.todayProgressCard).toBeVisible();
        await expect(dashboardPage.todayPlanCard).toBeVisible();

        const exerciseCards = page.getByTestId(/^exercise-card-/);
        await expect(exerciseCards.first()).toBeVisible();

        await dashboardPage.openChangePersonalDataModal();
        await expect(dashboardPage.profileSummaryModal).toBeVisible();
        await dashboardPage.closeModal();
        await expect(dashboardPage.profileSummaryModal).not.toBeVisible();

        await dashboardPage.openChangePasswordModal();
        await expect(dashboardPage.changePasswordModal).toBeVisible();
        await dashboardPage.closeModal();
        await expect(dashboardPage.changePasswordModal).not.toBeVisible();
    })

    test("should logout user", async ({ page }) => {
        const dashboardPage = createDashboardPage(page);
        await dashboardPage.logout();
        await expect(page).toHaveURL("http://localhost:5173/login");

        const tokenRemoved = await page.evaluate(() => localStorage.getItem('rehab-panel-token'));
        expect(tokenRemoved).toBeNull();
    })
})

test.describe("Dashboard Page - unauthenticated", () => {
    test("should redirect unauthenticated user to login page", async ({ page }) => {
        const dashboardPage = createDashboardPage(page);
        await dashboardPage.goto();
        await expect(page).toHaveURL("http://localhost:5173/login")
    })
})
