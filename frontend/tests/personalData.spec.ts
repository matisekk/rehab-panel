import test, { expect } from "@playwright/test";
import { createLoginPage } from "./pages/LoginPage";
import { createDashboardPage } from "./pages/DashboardPage";
import { createPersonalDataModal } from "./pages/personalDataModal";

test.describe("Personal Data Modal", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = createLoginPage(page);
        await loginPage.goto();
        await loginPage.login({ email: "jan@test.com", password: "Test1234!" });
        await expect(page).toHaveURL("http://localhost:5173/app/dashboard");

        const dashboardPage = createDashboardPage(page);
        await dashboardPage.openChangePersonalDataModal();
        await expect(dashboardPage.profileSummaryModal).toBeVisible();
    })

    //Check elements on page
    test("should have correct metadata and elements", async ({ page }) => {
        const personalDataModal = createPersonalDataModal(page);
        await expect(personalDataModal.personalDataHeading).toBeVisible();
        await expect(personalDataModal.closeButton).toBeVisible();
        await expect(personalDataModal.nameInput).toBeVisible();
        await expect(personalDataModal.surnameInput).toBeVisible();
        await expect(personalDataModal.saveChangesButton).toBeVisible();
    })

    test("should update personal data", async ({ page }) => {
        const personalDataModal = createPersonalDataModal(page);
        await personalDataModal.updatePersonalData({ name: "Janek", surname: "Kowal" });

        await expect(personalDataModal.successToast).toBeVisible();
    })

    test("should keep updated personal data after reload", async ({ page }) => {
        const personalDataModal = createPersonalDataModal(page);
        await personalDataModal.updatePersonalData({ name: "Janek", surname: "Kowal" });

        await page.reload();

        await expect(page.getByRole('heading', { name: "Hi, Janek!" })).toBeVisible();
    })

    //Negative sceranios
    test("should valid name field", async ({ page }) => {
        const personalDataModal = createPersonalDataModal(page);
        await personalDataModal.nameInput.clear();
        await personalDataModal.saveChangesButton.click();

        await expect(page.getByTestId('error-message-firstName')).toBeVisible();

    })

    test("should valid surname field", async ({ page }) => {
        const personalDataModal = createPersonalDataModal(page);
        await personalDataModal.surnameInput.clear();
        await personalDataModal.saveChangesButton.click();

        await expect(page.getByTestId('error-message-lastName')).toBeVisible();
    })

    test("should not allow to change email", async ({ page }) => {
        const personalDataModal = createPersonalDataModal(page);
        await expect(personalDataModal.emailInput).toBeDisabled();
    })
})