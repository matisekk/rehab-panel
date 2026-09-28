import test, { expect } from "@playwright/test";
import { createLoginPage } from "./pages/LoginPage";
import { createDashboardPage } from "./pages/DashboardPage";
import { createChangePasswordModal } from "./pages/changePasswordModal";

test.describe("Change Password Modal", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = createLoginPage(page);
        await loginPage.goto();
        await loginPage.login({ email: "jan@test.com", password: "Test1234!" });
        await expect(page).toHaveURL("http://localhost:5173/app/dashboard");

        const dashboardPage = createDashboardPage(page);
        await dashboardPage.openChangePasswordModal();
        await expect(dashboardPage.changePasswordModal).toBeVisible();
    })

    //Check elements on page
    test("should have correct metadata and elements", async ({ page }) => {
        const changePasswordModal = createChangePasswordModal(page);
        await expect(changePasswordModal.changePasswordHeading).toBeVisible();
        await expect(changePasswordModal.closeButton).toBeVisible();
        await expect(changePasswordModal.currentPasswordlInput).toBeVisible();
        await expect(changePasswordModal.newPasswordInput).toBeVisible();
        await expect(changePasswordModal.confirmPasswordInput).toBeVisible();
        await expect(changePasswordModal.saveChangesButton).toBeVisible();
    })

    test("should update password", async ({ page }) => {
        const changePasswordModal = createChangePasswordModal(page);

        await changePasswordModal.updatePassword({ currentPassword: "Test1234!", newPassword: "Test1234!@", confirmPassword: "Test1234!@" });

        await expect(changePasswordModal.successToast).toBeVisible();
        await changePasswordModal.successToast.getByRole('button').click();
        await expect(changePasswordModal.successToast).toBeHidden();

        //revert changes after update
        const dashboardPage = createDashboardPage(page);
        await dashboardPage.openChangePasswordModal();
        await changePasswordModal.updatePassword({ currentPassword: "Test1234!@", newPassword: "Test1234!", confirmPassword: "Test1234!" })
        await expect(changePasswordModal.successToast).toBeVisible();
    })

    test("should update password and log in with new password", async ({ page }) => {
        //change password
        const changePasswordModal = createChangePasswordModal(page);
        await changePasswordModal.updatePassword({ currentPassword: "Test1234!", newPassword: "Test1234!@", confirmPassword: "Test1234!@" });
        await expect(changePasswordModal.successToast).toBeVisible();
        await changePasswordModal.successToast.getByRole('button').click();
        await expect(changePasswordModal.successToast).toBeHidden();

        //logout
        const dashboardPage = createDashboardPage(page);
        await dashboardPage.logout();
        await expect(page).toHaveURL("http://localhost:5173/login");

        //check if new password works
        const loginPage = createLoginPage(page);
        await loginPage.login({ email: "jan@test.com", password: "Test1234!@" });
        await expect(page).toHaveURL("http://localhost:5173/app/dashboard");

        //revert password to previous
        await dashboardPage.openChangePasswordModal();
        await changePasswordModal.updatePassword({ currentPassword: "Test1234!@", newPassword: "Test1234!", confirmPassword: "Test1234!" })
        await expect(changePasswordModal.successToast).toBeVisible();
        await changePasswordModal.successToast.getByRole('button').click();
        await expect(changePasswordModal.successToast).toBeHidden();
    })

    //Negative sceranios
    test("should block saving changes when fields are empty", async ({ page }) => {
        const changePasswordModal = createChangePasswordModal(page);
        await changePasswordModal.saveChangesButton.click();
        await expect(page.getByTestId('error-message-currentPassword')).toBeVisible();
        await expect(page.getByTestId('error-message-newPassword')).toBeVisible();
        await expect(page.getByTestId('error-message-confirmPassword')).toBeVisible();
    })

    test("should valid current password", async ({ page }) => {
        const changePasswordModal = createChangePasswordModal(page);
        await changePasswordModal.newPasswordInput.fill("Test1234");
        await changePasswordModal.confirmPasswordInput.fill("Test1234");
        await changePasswordModal.saveChangesButton.click();
        await expect(page.getByTestId('error-message-currentPassword')).toBeVisible();
    })

    test("should valid new password & confirm password", async ({ page }) => {
        const changePasswordModal = createChangePasswordModal(page);
        await changePasswordModal.currentPasswordlInput.fill("Test1234!");
        await changePasswordModal.confirmPasswordInput.fill("Test1234");
        await changePasswordModal.saveChangesButton.click();
        await expect(page.getByTestId('error-message-newPassword')).toBeVisible();
        await expect(page.getByTestId('error-message-confirmPassword')).toBeVisible();
    })
    test("should new password & confirm password contain at least 6 chars", async ({ page }) => {
        const changePasswordModal = createChangePasswordModal(page);
        await changePasswordModal.currentPasswordlInput.fill("Test1234!");
        await changePasswordModal.newPasswordInput.fill("Test");
        await changePasswordModal.confirmPasswordInput.fill("Test");
        await changePasswordModal.saveChangesButton.click();
        await expect(page.getByTestId('error-message-newPassword')).toBeVisible();
    })
})