import { Page } from "@playwright/test"

interface ChangePasswordModalProps {
    confirmPassword: string,
    newPassword: string,
    currentPassword: string,
}

export const createChangePasswordModal = (page: Page) => {
    const changePasswordHeading = page.getByRole('heading', { name: "Change password" });
    const closeButton = page.getByRole("button", { name: "Close" });
    const currentPasswordlInput = page.getByLabel(/^Current password\s*\*?$/);
    const newPasswordInput = page.getByLabel(/^New password\s*\*?$/);
    const confirmPasswordInput = page.getByLabel(/^Confirm password\s*\*?$/);
    const saveChangesButton = page.getByRole('button', { name: "Change password" });
    const successToast = page.getByTestId("toast");

    return {
        updatePassword: async ({ currentPassword, newPassword, confirmPassword }: ChangePasswordModalProps) => {
            await currentPasswordlInput.fill(currentPassword);
            await newPasswordInput.fill(newPassword);
            await confirmPasswordInput.fill(confirmPassword)
            await saveChangesButton.click();
        },
        changePasswordHeading,
        closeButton,
        currentPasswordlInput,
        newPasswordInput,
        confirmPasswordInput,
        saveChangesButton,
        successToast,
    }
}
