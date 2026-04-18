import { createSlice } from "@reduxjs/toolkit";
import { FetchAPI } from "@/fetch/fetchApi";

interface ApiData {
  message?: string;
  token?: string;
  data?: Record<string, unknown> | null;
}

interface ApiState {
  data: ApiData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: null,
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: "apiSlice",
  initialState,
  reducers: {
    clearApiState: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })

      .addCase(FetchAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          message: action.payload?.message,
          token: action.payload?.token,
          data: action.payload?.data ?? null,
        };
      })

      .addCase(FetchAPI.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message ?? "Something went wrong";
      });
  },
});

export const { clearApiState } = apiSlice.actions;
export default apiSlice.reducer;