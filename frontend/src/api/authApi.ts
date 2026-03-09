import { apiRequest } from "./client";

export function logoutUser(token: string) {
    return apiRequest("/api/auth/logout", { method: "POST", token })
} 