import test, { expect } from "@playwright/test";
import { createRegisterPage } from "./pages/RegisterPage";

test.describe("Register Page", () => {
    test.beforeEach(async ({ page }) => {
        const registerPage = createRegisterPage(page);
        await registerPage.goto();
    })

    test("should have correct metadata and elements", async ({ page }) => {
        const registerPage = createRegisterPage(page);
        await expect(page).toHaveTitle("Rehab Panel");

        await expect(registerPage.registerHeading).toBeVisible();

        await expect(registerPage.registerSubtext).toBeVisible();

        await expect(registerPage.nameInput).toBeVisible();
        await expect(registerPage.surnameInput).toBeVisible();
        await expect(registerPage.emailInput).toBeVisible();
        await expect(registerPage.passwordInput).toBeVisible();
        await expect(registerPage.confirmPasswordInput).toBeVisible();

        await expect(registerPage.registerButton).toBeVisible();

        await expect(registerPage.loginLinkHelperText).toBeVisible();

        await expect(registerPage.loginLink).toBeVisible();
    })

    //Positive scenarios
    test("should register new account and redirect to dashboard page", async ({ page }) => {
        const email = `jan.${Date.now()}@kowalski.com`;
        const registerPage = createRegisterPage(page);
        await registerPage.register({ name: "Jan", surname: "Kowalski", email, password: "Test1234!", confirmPassword: "Test1234!" });

        await expect(page).toHaveURL("http://localhost:5173/app/dashboard");

        const token = await page.evaluate(() => localStorage.getItem('rehab-panel-token'))
        expect(token).toBeTruthy();
    })

    test("should redirect to login page", async ({ page }) => {
        const registerPage = createRegisterPage(page);
        await registerPage.goToLogin();

        await expect(page).toHaveURL("http://localhost:5173/login")
    })

    //Negative sceranios
    test("should show message when account already exist", async ({ page }) => {
        const registerPage = createRegisterPage(page);
        await registerPage.register({ name: "Jan", surname: "Kowalski", email: "jan@test.com", password: "Test1234!", confirmPassword: "Test1234!" });

        await expect(registerPage.errorToast).toBeVisible();
        await expect(page).toHaveURL("http://localhost:5173/register");
    })

    test("should show message when mail isn't valid", async ({ page }) => {
        const registerPage = createRegisterPage(page);
        await registerPage.register({ name: "Jan", surname: "Kowalski", email: "jan@.com", password: "Test1234!", confirmPassword: "Test1234!" });

        await expect(registerPage.errorMessageEmail).toBeVisible();
        await expect(page).toHaveURL("http://localhost:5173/register");
    })

    test("should show message when password isn't long enough", async ({ page }) => {
        const email = `jan.${Date.now()}@kowalski.com`;
        const registerPage = createRegisterPage(page);
        await registerPage.register({ name: "Jan", surname: "Kowalski", email, password: "test", confirmPassword: "test" });

        await expect(registerPage.errorMessagePassword).toBeVisible();
        await expect(page).toHaveURL("http://localhost:5173/register");
    })

    test("should show message when passwords don't matched", async ({ page }) => {
        const email = `jan.${Date.now()}@kowalski.com`;
        const registerPage = createRegisterPage(page);
        await registerPage.register({ name: "Jan", surname: "Kowalski", email, password: "Test1234!", confirmPassword: "Test1234" });

        await expect(registerPage.errorToast).toBeVisible();
        await expect(page).toHaveURL("http://localhost:5173/register");
    })

    test("should not allow login with empty fields", async ({ page }) => {
        const registerPage = createRegisterPage(page);
        await expect(registerPage.registerButton).toBeDisabled();
    })
})