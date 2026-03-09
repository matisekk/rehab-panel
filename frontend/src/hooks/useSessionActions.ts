import { useCallback, useState } from "react";
import type { ApiError } from "../api/client";
import { finishSessionRequest, startSessionRequest } from "../api/sessionApi";
import { useAppSelector } from "../store/reduxHooks";

export function useSessionActions() {
    const token = useAppSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const start = useCallback(
        async (exerciseId: string): Promise<string> => {
            if (!token) {
                throw new Error("No token");
            }

            setLoading(true);
            setError(null);

            try {
                const response = await startSessionRequest(token, exerciseId);
                return response.sessionId;
            } catch (e) {
                const err = e as ApiError;
                const message = err.message || "Failed to start the exercise";
                setError(message);
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [token],
    );

    const finish = useCallback(
        async (sessionId: string): Promise<void> => {
            if (!token) {
                throw new Error("No token");
            }

            setLoading(true);
            setError(null);

            try {
                await finishSessionRequest(token, sessionId);
            } catch (e) {
                const err = e as ApiError;
                const message = err.message || "Failed to end the exercise";
                setError(message);
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [token],
    );

    return { start, finish, loading, error };
}