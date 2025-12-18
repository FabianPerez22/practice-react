import { useAppDispatch } from "./hooks";
import { deleteMedicamentById } from "../app/medicaments/medicamentSlice";

const useMedicaments = () => {
  const dispatch = useAppDispatch();

  const removeMedicament = (id: string) => {
    dispatch(deleteMedicamentById(id));
  };

  return {removeMedicament}
};

export default useMedicaments;
