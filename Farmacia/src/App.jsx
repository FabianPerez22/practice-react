import "./App.css";
import { Link, NavLink, Route, Routes} from "react-router-dom";
import Medicamento from "./pages/Medicaments.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {
  return (
    <>
      <header>
        <h1>Farmacia App</h1>
        <nav>
          <NavLink to="/">Inicio</NavLink>  <NavLink to="/search">Buscador</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={ <SearchPage />} >
        <Route path="/search/medicamentos/:name" element={ <Medicamento /> } />
        </Route>
        <Route path="*" element={<PageNotFound />} ></Route>
      </Routes>
    </>
  );
}

export default App;
