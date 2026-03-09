import type { AuthUser } from "../types/authTypes";
import { apiRequest } from "./client";

type ChangePasswordBody = {
    oldPassword: string;
    newPassword: string;
}

type ChangePersonalInfoBody = {
    firstName: string;
    lastName: string;
}

export function changePassword(token: string, body: ChangePasswordBody) {
    return apiRequest("/api/me/password", {
        method: "PUT",
        body,
        token,
    });
}

export function changePersonalInfo(token: string, body: ChangePersonalInfoBody) {
    return apiRequest<AuthUser>("/api/me", {
        method: "PUT",
        body,
        token,
    });
}
