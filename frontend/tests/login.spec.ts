import test, { expect } from "@playwright/test";
import { createLoginPage } from "./pages/LoginPage";

test.describe("Login Page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = createLoginPage(page);
        await loginPage.goto();
    })

    //Check elements on page
    test("should have correct metadata and elements", async ({ page }) => {
        const loginPage = createLoginPage(page);
        await expect(page).toHaveTitle("Rehab Panel");

        await expect(loginPage.loginHeading).toBeVisible();

        await expect(loginPage.loginSubtext).toBeVisible();

        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();

        await expect(loginPage.loginButton).toBeVisible();

        await expect(loginPage.registerLinkHelperText).toBeVisible();

        await expect(loginPage.registerLink).toBeVisible();
    })

    //Positive scenarios
    test("should log in to app and redirect to dashboard page", async ({ page }) => {
        const loginPage = createLoginPage(page)
        await loginPage.login({ email: "jan@test.com", password: "Test1234!" })
        await expect(page).toHaveURL("http://localhost:5173/app/dashboard");

        const token = await page.evaluate(() => localStorage.getItem('rehab-panel-token'))
        expect(token).toBeTruthy();
    })

    test("should redirect to register page", async ({ page }) => {
        const loginPage = createLoginPage(page)
        await loginPage.goToRegister();

        await expect(page).toHaveURL("http://localhost:5173/register")
    })

    test("should redirect unauthenticated user to login", async ({ page }) => {
        const loginPage = createLoginPage(page);

        loginPage.redirectWithoutAuth();

        await expect(page).toHaveURL("http://localhost:5173/login")
    })

    //Negative sceranios
    test("should show message for invalid credentials", async ({ page }) => {
        const loginPage = createLoginPage(page);
        await loginPage.login({ email: "jan@test.com", password: "BadPassword1234!" });

        await expect(loginPage.errorToast).toBeVisible();
        await expect(page).toHaveURL("http://localhost:5173/login")

    })

    test("should show message when mail isn't valid", async ({ page }) => {
        const loginPage = createLoginPage(page);
        await loginPage.login({ email: "jan@.com", password: "Test1234!" });

        await expect(loginPage.errorMessageEmail).toBeVisible();
        await expect(page).toHaveURL("http://localhost:5173/login")
    })

    test("should not allow login with empty fields", async ({ page }) => {
        const loginPage = createLoginPage(page);
        await expect(loginPage.loginButton).toBeDisabled();
    })
})
