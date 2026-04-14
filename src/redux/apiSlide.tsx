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
  name: "api",
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
      // 🟡 loading
      .addCase(FetchAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // 🟢 success
      .addCase(FetchAPI.fulfilled, (state, action) => {
        state.loading = false;

        state.data = {
          message: action.payload?.message,
          token: action.payload?.token,
          data: action.payload?.data ?? action.payload,
        };
      })

      // 🔴 error
      .addCase(FetchAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ||
    action.error.message ||
    "Something went wrong";
});
  },
});

export const { clearApiState } = apiSlice.actions;
export default apiSlice.reducer;