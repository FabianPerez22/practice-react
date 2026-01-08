import { useAppDispatch } from "./hooks";
import { addingMedicament, getRegisters, removingRegister, searchMedicaments } from "../app/medicaments/searchSlice";

const useMedicaments = () => {
  const dispatch = useAppDispatch();

  const removeMedicament = async (id: number) => {
    await dispatch(removingRegister({id}));
  };

    const getAllRegisters = async (userId: number) => {
    await dispatch(getRegisters({ userId }));
  };

  const searchMedicament = async (name: string ) =>{
    await dispatch(searchMedicaments(name));
  }

  const addMedicament = async ({name, userId}: {name: string, userId: number}) => {
    await dispatch(addingMedicament({ name, userId }));
  }

  return {removeMedicament, getAllRegisters, searchMedicament, addMedicament}
};

export default useMedicaments;
