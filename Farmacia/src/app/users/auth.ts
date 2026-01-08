import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

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
  id: number;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

api.defaults.withCredentials = true;

export const getMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(null);
    }
  }
);

export const logouts = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/logout");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(null);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credential: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/login", credential);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message);
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
      const res2 = await api.post("/auth/register", credential);
      return res2.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Error del registro"
      );
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
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
