import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/auth/authSlice";
import categoryReducer from '@/redux/features/categorySlice'
import sidebarReducer from '@/redux/features/sidebar'
import courseReducer from '@/redux/features/courseSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
const rootReducer = combineReducers({
   auth: authReducer,
    category:categoryReducer,
    sidebar:sidebarReducer,
    course:courseReducer,
})
const persistConfig = {
  key:'root',
  storage,
  whitelist:['category']
}
const persisedRducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer: persisedRducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:false
    })
});
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
