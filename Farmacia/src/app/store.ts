import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./users/auth";
import medicamentReducer from "./medicaments/medicamentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicament: medicamentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
