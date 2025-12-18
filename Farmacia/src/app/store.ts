import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";
import medicamentReducer from "./medicaments/medicamentSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    medicament: medicamentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
