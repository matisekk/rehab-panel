import { Page } from "@playwright/test";

interface LoginPageProps {
    email: string,
    password: string,
}


export const createLoginPage = (page: Page) => {
    const loginHeading = page.getByRole('heading', { name: "Rehabilitation Panel" })
    const loginSubtext = page.getByText("Login to view your plan and start exercising")
    const emailInput = page.getByLabel(/^Email\s*\*?$/);
    const passwordInput = page.getByLabel(/^Password\s*\*?$/);
    const loginButton = page.getByRole("button", { name: "Login" });
    const registerLinkHelperText = page.getByText("Don't have an account?")
    const registerLink = page.getByRole('link', { name: "Register" })

    const errorToast = page.getByTestId('toast');
    const errorMessageEmail = page.getByTestId("error-message-email");

    return {
        goto: async () => {
            await page.goto("http://localhost:5173/login");
        },
        login: async ({ email, password }: LoginPageProps) => {
            await emailInput.fill(email);
            await passwordInput.fill(password);
            await loginButton.click();
        },

        goToRegister: async () => {
            await registerLink.click()
        },
        redirectWithoutAuth: async () => {
            await page.goto("http://localhost:5173/app/dashboard");
        },
        loginSubtext,
        loginHeading,
        emailInput,
        passwordInput,
        loginButton,
        registerLinkHelperText,
        registerLink,
        errorToast,
        errorMessageEmail
    }
}