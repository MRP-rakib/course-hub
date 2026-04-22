import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  fullname: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;