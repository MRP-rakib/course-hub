import { AuthUser, Profile } from "@/types/authType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
}

const initialState: User = {
  user: null,
  profile: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },

    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.profile = null;
      state.loading = false;
    },
  },
});

export const {
  setUser,
  setProfile,
  setLoading,
  logout,
} = authSlice.actions;

export default authSlice.reducer;