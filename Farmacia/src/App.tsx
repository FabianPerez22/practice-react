import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Medicamento from "./pages/Medicaments.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import Home from "./pages/Home.js";
import PageNotFound from "./pages/PageNotFound.jsx"
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPages from "./pages/registerPages.tsx";
import { useAppDispatch, useAppSelector } from "./aplication/hooks.ts";
import { useEffect } from "react";
import { getMe, logout } from "./app/users/auth.ts";


function App() {
  const authState = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  useEffect(() => {

    const handler = () => {
      dispatch(logout());
      navigate("/");
    };

    window.addEventListener("unauthorized", handler);

    return () => {
      window.removeEventListener("unauthorized", handler);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterPages />} />
        <Route path="/search" element={<SearchPage />}>
          <Route path="/search/medicamentos/:name" element={<Medicamento />} />
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
