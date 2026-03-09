import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../store/reduxHooks";
import type { DashboardResponse } from "../../types/dashboardTypes";
import { apiRequest, type ApiError } from "../../api/client";
import { showErrorToast } from "../../utils/toast";
import Dashboard from "../../pages/Dashboard";

const DashboardRoute = () => {
    const token = useAppSelector((state) => state.auth.token);
    const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadDashboard = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);

        try {
            const data = await apiRequest<DashboardResponse>("/api/me/dashboard", { token });
            setDashboardData(data);
        } catch (err: unknown) {
            const error = err as ApiError;
            showErrorToast({
                title: "Failed to fetch dashboard data",
                description: error.message || "Something went wrong",
            });
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        void loadDashboard();
    }, [loadDashboard]);

    return (
        <Dashboard
            dashboardData={dashboardData}
            isLoading={isLoading}
            onDashboardRefresh={loadDashboard}
        />
    );
};

export default DashboardRoute;