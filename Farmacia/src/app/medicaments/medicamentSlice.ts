import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Medicaments {
  name: string;
  description: string;
}

export interface MedicamentsWithId extends Medicaments {
  id: string;
}

const initialState: MedicamentsWithId[] = [
  {
    id: "1",
    name: "XELOX",
    description:
      "Nombre de una quimioterapia combinada que se usa para el tratamiento del cáncer colorrectal que se diseminó. También está en estudio para el tratamiento de otros tipos de cáncer. Incluye los medicamentos capecitabina (Xeloda) y oxaliplatino. También se llama régimen XELOX.",
  },
  {
    id: "2",
    name: "Ibuprofeno",
    description:
      "Medicamento que se usa para tratar la fiebre, la hinchazón, el dolor y el enrojecimiento al impedir que el cuerpo elabore sustancias que causan inflamación. Es un tipo de antiinflamatorio no esteroideo (AINE). También se llama Advil y Motrin.",
  },
   {
    id: "3",
    name: "ZAFIRLUKAST",
    description:
      "Medicamento que se usa para prevenir y tratar los síntomas del asma. Bloquea las sustancias que hacen inflamar los pulmones. Es un tipo de antiasmático y un antagonista del receptor del leucotrieno. También se llama Accolate.",
  },
];

export const medicamentSlice = createSlice({
  name: "medicament",
  initialState,
  reducers: {
    deleteMedicamentById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
  },
});

export default medicamentSlice.reducer;

export const { deleteMedicamentById } = medicamentSlice.actions;
