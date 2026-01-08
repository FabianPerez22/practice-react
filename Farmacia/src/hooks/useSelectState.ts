import { useAppSelector } from "./hooks";

const useSelectState = () => {
  const auth = useAppSelector((state) => state.auth);
  const searchs = useAppSelector((state) => state.farmacy);

  const userId = auth.user?.id;
  const userLoader = auth.loading;
  const registers = searchs?.registers;
  const searchError = searchs.error;

  return { auth, registers, userId, searchs, userLoader, searchError };
};

export default useSelectState;
