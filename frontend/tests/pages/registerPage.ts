import { Page } from "@playwright/test";

interface RegisterPageProps {
    name: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export const createRegisterPage = (page: Page) => {
    const registerHeading = page.getByRole('heading', { name: "Create account" })
    const registerSubtext = page.getByText("Fill in the form to create a new account");
    const nameInput = page.getByLabel(/^Name\s*\*?$/);
    const surnameInput = page.getByLabel(/^Surname\s*\*?$/);
    const emailInput = page.getByLabel(/^Email\s*\*?$/);
    const passwordInput = page.getByLabel(/^Password\s*\*?$/);
    const confirmPasswordInput = page.getByLabel(/^Confirm password\s*\*?$/);
    const registerButton = page.getByRole("button", { name: "Create account" });
    const loginLinkHelperText = page.getByText("Have an account?")
    const loginLink = page.getByRole('link', { name: "Log in" });

    const errorMessageEmail = page.getByTestId("error-message-email");
    const errorMessagePassword = page.getByTestId("error-message-password");
    const errorToast = page.getByTestId('toast');


    return {
        goto: async () => {
            await page.goto("http://localhost:5173/register");
        },
        register: async ({ name, surname, email, password, confirmPassword }: RegisterPageProps) => {
            await nameInput.fill(name);
            await surnameInput.fill(surname);
            await emailInput.fill(email);
            await passwordInput.fill(password);
            await confirmPasswordInput.fill(confirmPassword);
            await registerButton.click();
        },
        goToLogin: async () => {
            await loginLink.click()
        },
        registerHeading,
        registerSubtext,
        nameInput,
        surnameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        registerButton,
        loginLinkHelperText,
        loginLink,
        errorToast,
        errorMessageEmail,
        errorMessagePassword
    }
}