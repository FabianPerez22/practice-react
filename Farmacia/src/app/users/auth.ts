import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router-dom";

interface AuthState {
  user: UserWithId | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserWithId extends User {
  id: string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

//thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credential: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:4323/auth/login",
        credential
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.error || "Error de login");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    credential: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res2 = await axios.post(
        "http://localhost:4323/auth/register",
        credential
      );
      return res2.data;
    } catch(err: any) {
      return rejectWithValue(err?.response?.data?.error || "Error del registro")
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
