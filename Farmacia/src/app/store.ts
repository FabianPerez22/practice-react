import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./users/auth";
import medicamentReducer from "./medicaments/medicamentSlice";
import searchReducer from "./medicaments/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicament: medicamentReducer,
    farmacy: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
