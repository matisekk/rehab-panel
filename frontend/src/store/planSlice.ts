import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../api/client";
import type { PlanResponse } from "../types/planTypes";

export type PlanState = {
  data: PlanResponse | null;
  loading: boolean;
  error: string | null;
};

const initialState: PlanState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPlan = createAsyncThunk<
  PlanResponse,
  { token: string }
>("plan/fetchPlan", async ({ token }) => {
  return apiRequest<PlanResponse>("/api/me/plan", { token });
});

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    clearPlan(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPlan.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.error.message as string | undefined) ?? "Failed to fetch the plan";
      });
  },
});
export const { clearPlan } = planSlice.actions;

export const planReducer = planSlice.reducer;

