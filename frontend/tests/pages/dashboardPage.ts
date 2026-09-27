import { Page } from "@playwright/test"

export const createDashboardPage = (page: Page) => {
    const dashboardHeading = page.getByRole("heading", { name: "Rehab Panel" });
    const logoutButton = page.getByRole("button", { name: "Log out" });
    const userWelcomeText = page.getByRole('heading', { name: /^Hi,\s.+/ });
    const changePersonalDataButton = page.getByRole("button", { name: "Change personal data" });
    const changePasswordButton = page.getByRole("button", { name: "Change password" });
    const todayGoalCard = page.getByTestId("todayGoalCard");
    const weeklyProgresCard = page.getByTestId("weeklyProgresCard");
    const tipOfTheDayCard = page.getByTestId("tipOfTheDayCard");
    const todayProgressCard = page.getByTestId("todayProgressCard");
    const todayPlanCard = page.getByTestId("todayPlanCard");
    const profileSummaryModal = page.getByTestId('profileSummaryCardModal');
    const changePasswordModal = page.getByTestId('changePasswordCardModal');

    const closeModal = page.getByRole("button", { name: "Close" });

    return {
        goto: async () => {
            await page.goto("http://localhost:5173/app/dashboard");
        },
        logout: async () => {
            await logoutButton.click();
        },
        openChangePersonalDataModal: async () => {
            await changePersonalDataButton.click();
        },
        openChangePasswordModal: async () => {
            await changePasswordButton.click();
        },
        closeModal: async () => {
            await closeModal.click();
        },
        dashboardHeading,
        logoutButton,
        userWelcomeText,
        changePersonalDataButton,
        changePasswordButton,
        todayGoalCard,
        weeklyProgresCard,
        tipOfTheDayCard,
        todayProgressCard,
        todayPlanCard,
        profileSummaryModal,
        changePasswordModal
    }
} 