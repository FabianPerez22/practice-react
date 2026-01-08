import { loginUser, logout, logouts, registerUser } from "../app/users/auth";
import { useAppDispatch } from "./hooks";

const useAuth = () => {
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    return await dispatch(loginUser({ email, password }));
  };

  const register = async (name: string, email: string, password: string) => {
    return await dispatch(registerUser({ name, email, password }));
  };

  const userLogout = async () => {
    dispatch(logout());
    dispatch(logouts());
  };

  return { login, userLogout, register };
};

export default useAuth;
