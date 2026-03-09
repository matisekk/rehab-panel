import { apiRequest } from "./client";

export function startSessionRequest(token: string, exerciseId: string) {
    return apiRequest<{ sessionId: string }>("/api/sessions", {
        method: "POST",
        body: { exerciseId },
        token,
    });
}

export function finishSessionRequest(token: string, sessionId: string) {
    return apiRequest(`/api/sessions/${sessionId}/finish`, {
        method: "POST",
        token,
    });
}