import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest, type ApiError } from "../api/client";
import type {
    AuthUser,
    LoginCredentials,
    RegisterCredentials,
} from "../types/authTypes";

export const STORAGE_KEY = "rehab-panel-token";

type AuthState = {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    isInitializing: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    isInitializing: true,
    error: null,
};

type AuthResponse = {
    token: string;
    user: AuthUser;
};

export const fetchMe = createAsyncThunk<
    { token: string; user: AuthUser },
    void,
    { rejectValue: string }
>("auth/fetchMe", async (_, { rejectWithValue }) => {
    const token = localStorage.getItem(STORAGE_KEY);

    if (!token) {
        return rejectWithValue("No token");
    }

    try {
        const user = await apiRequest<AuthUser>("/api/me", { token });
        return { token, user };
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return rejectWithValue("Failed to fetch user");
    }
});

export const loginUser = createAsyncThunk<
    AuthResponse,
    LoginCredentials,
    { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const response = await apiRequest<AuthResponse>("/api/auth/login", {
            method: "POST",
            body: credentials,
        });

        localStorage.setItem(STORAGE_KEY, response.token);
        return response;
    } catch (e) {
        const err = e as ApiError;
        return rejectWithValue(err.message || "Failed to log in");
    }
});

export const registerUser = createAsyncThunk<
    AuthResponse,
    RegisterCredentials,
    { rejectValue: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
    try {
        const response = await apiRequest<AuthResponse>("/api/auth/register", {
            method: "POST",
            body: credentials,
        });

        localStorage.setItem(STORAGE_KEY, response.token);
        return response;
    } catch (e) {
        const err = e as ApiError;
        return rejectWithValue(err.message || "Failed to register");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem(STORAGE_KEY);
        },
        clearAuthError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMe.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isInitializing = false;
                state.error = null;
            })
            .addCase(fetchMe.rejected, (state, action) => {
                state.user = null;
                state.token = null;
                state.isInitializing = false;
                state.error = action.payload || null;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to log in";
            })

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to register";
            });
    },
});

export const { logout, clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
