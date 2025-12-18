import "./App.css";
import {  NavLink, Route, Routes } from "react-router-dom";
import Medicamento from "./pages/Medicaments.js";
import SearchPage from "./pages/SearchPage.js";
import Home from "./pages/Home.js";
import PageNotFound from "./pages/PageNotFound.jsx"
import RegisterPage from "./pages/RegisterPage.js";


function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchPage />}>
          <Route path="/search/medicamentos/:name" element={<Medicamento />} />
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
