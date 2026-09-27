import { Page } from "@playwright/test";

interface PersonalDataModalProps {
    name: string,
    surname: string,
}


export const createPersonalDataModal = (page: Page) => {
    const personalDataHeading = page.getByRole('heading', { name: "Personal information" });
    const closeButton = page.getByRole("button", { name: "Close" });
    const nameInput = page.getByLabel(/^Name\s*\*?$/);
    const surnameInput = page.getByLabel(/^Surname\s*\*?$/);
    const emailInput = page.getByLabel(/^Email\s*\*?$/);
    const saveChangesButton = page.getByRole('button', { name: "Save changes" });
    const successToast = page.getByTestId("toast");

    return {
        updatePersonalData: async ({ name, surname }: PersonalDataModalProps) => {
            await nameInput.fill(name);
            await surnameInput.fill(surname);
            await saveChangesButton.click();
        },

        personalDataHeading,
        closeButton,
        nameInput,
        surnameInput,
        emailInput,
        saveChangesButton,
        successToast,
    }
} 