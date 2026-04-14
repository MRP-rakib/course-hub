import { createSlice } from "@reduxjs/toolkit";
import { FetchAPI } from "@/fetch/fetchApi";

interface AuthState {
  message:string|null ;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  message: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      // 🟡 API pending
      .addCase(FetchAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // 🟢 API success
      .addCase(FetchAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })

      // 🔴 API error
      .addCase(FetchAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;