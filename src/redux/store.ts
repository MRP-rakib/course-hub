import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/auth/authSlice";
import categoryReducer from '@/redux/features/categorySlice'
import sidebarReducer from '@/redux/features/sidebar'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category:categoryReducer,
    sidebar:sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
