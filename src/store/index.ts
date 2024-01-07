import { configureStore } from "@reduxjs/toolkit";
import vehiclesSlice from "./vehicles-slice";

export const store = configureStore({
  reducer: {
    vehicles: vehiclesSlice,
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
