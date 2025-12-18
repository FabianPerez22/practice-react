import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserWithId extends User {
  id: string;
}

const initialState: UserWithId = {
  id: "1",
  name: "pepe",
  email: "pepe@gmail.com",
  password: "12345",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
  },
});

export default usersSlice.reducer;

export const { deleteUserById } = usersSlice.actions;
