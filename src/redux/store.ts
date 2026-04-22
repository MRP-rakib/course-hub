import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "@/redux/apiSlice";
import authReducer from "@/redux/auth/authSlice";
export const store = configureStore({
  reducer: {
    api: apiReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
