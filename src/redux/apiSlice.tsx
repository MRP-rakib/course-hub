import { createSlice } from "@reduxjs/toolkit";
import { FetchAPI } from "@/redux/fetch/fetchApi";

interface ApiState {
  message: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  message: null,
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: "apiSlice",
  initialState,
  reducers: {
    clearApiState: (state) => {
      state.message = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(FetchAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })

      .addCase(FetchAPI.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? "Something went wrong");
      });
  },
});

export const { clearApiState } = apiSlice.actions;
export default apiSlice.reducer;
