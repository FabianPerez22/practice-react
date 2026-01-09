import api from "../../api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Medicaments {
  name: string;
  description: string;
}

export interface MedicamentsWithId extends Medicaments {
  id: number;
}

export interface typeSearcs {
  searchs: Medicaments | null;
  registers: MedicamentsWithId[] | null;
  loadingSearch: boolean;
  loadingAdd: boolean;
  loadingRegisters: boolean;
  loadingRemove: boolean;
  error: string | null;
}

const initialState: typeSearcs = {
  searchs: null,
  registers: null,
  loadingSearch: false,
  loadingAdd: false,
  loadingRegisters: false,
  loadingRemove: false,
  error: null,
};

export const searchMedicaments = createAsyncThunk(
  "medicaments/searchs",
  async (name: { name: string }, { rejectWithValue }) => {
    try {
      const res = await api.get(`farmacia/description/${name}`);
      const dat = res.data[0];

      const formatData = {
        name: dat.termName,
        description: dat.definition.text,
      };

      return formatData;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "No se pudo realizar la busqueda."
      );
    }
  }
);

export const getRegisters = createAsyncThunk(
  "medicaments/getRegisters",
  async (data: { userId: number }, { rejectWithValue }) => {
    try {
      const results = await api.post(`farmacia/registers`, data);
      return results.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "No se pudo traer los registros."
      );
    }
  }
);

export const addingMedicament = createAsyncThunk(
  "medicaments/add",
  async (data: { name: string; userId: number }, { rejectWithValue }) => {
    try {
      const results = await api.post(`farmacia/adding`, data);
      return results.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "No se pudo agregar esta busqueda."
      );
    }
  }
);

export const removingRegister = createAsyncThunk(
  "medicaments/remove",
  async (data: { id: number }, { rejectWithValue }) => {
    try {
      const results = await api.delete(`farmacia/removing`, { data });
      console.log(results.data);
      return results.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "No se pudo eliminar este registro."
      );
    }
  }
);

export const searchSlice = createSlice({
  name: "medicament",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMedicaments.pending, (state) => {
        state.loadingSearch = true;
        state.error = null;
      })
      .addCase(searchMedicaments.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.searchs = action.payload;
      })
      .addCase(searchMedicaments.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.payload as string;
      })
      .addCase(addingMedicament.pending, (state) => {
        state.loadingAdd = true;
        state.error = null;
      })
      .addCase(addingMedicament.fulfilled, (state) => {
        state.loadingAdd = false;
        state.error = null;
      })
      .addCase(addingMedicament.rejected, (state, action) => {
        state.loadingAdd = false;
        state.error = action.payload as string;
      })
      .addCase(getRegisters.pending, (state) => {
        state.loadingRegisters = true;
        state.error = null;
      })
      .addCase(getRegisters.fulfilled, (state, action) => {
        state.loadingRegisters = false;
        state.registers = action.payload;
      })
      .addCase(getRegisters.rejected, (state, action) => {
        state.loadingRegisters = false;
        state.error = action.payload as string;
      })
      .addCase(removingRegister.pending, (state) => {
        state.loadingRemove = true;
        state.error = null;
      })
      .addCase(removingRegister.fulfilled, (state, action) => {
        state.loadingRemove = false;
        state.registers =
          state.registers?.filter((r) => r.id !== action.meta.arg.id) ?? null;
      })
      .addCase(removingRegister.rejected, (state, action) => {
        state.loadingRemove = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
