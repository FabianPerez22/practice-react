import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

// api de medicamentos https://webapis.cancer.gov/glossary/v1/Terms/Cancer.gov/Patient/es/:name
// API de navegacion de medicamentos: https://webapis.cancer.gov/glossary/v1/Terms/expand/Cancer.gov/Patient/es/B?size=5
// API de buscador de medicamentos https://webapis.cancer.gov/glossary/v1/Terms/search/Cancer.gov/Patient/es/:buscar?matchType=Begins&size=5

const SearchPage = () => {

    const [medicamentos, setMedicamentos] = useState([]);
    const [busqueda, setBusqueda] = useState("");

 const buscarMedicamento = (nombre) => {

    let formatName = nombre.replaceAll(" ", "-");

    fetch(`https://webapis.cancer.gov/glossary/v1/Terms/search/Cancer.gov/Patient/es/${formatName.normalize('NFD')
                   .replace(/[\u0300-\u036f]/g, '')}?matchType=Begins&size=10`)
      .then((response) => response.json())
      .then((data) => setMedicamentos(data.results.map(item => item.termName)))
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <>
      <Outlet />
    <div className="container-list">
      <div className="list-container">
        <h1>Lista de  <br/> Medicamentos <br/> y <br/> enfermedades</h1>
        <p>Buscar medicamento</p>

            <button onClick={() => buscarMedicamento(busqueda)}>Buscar</button>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Escribe el nombre del medicamento"
            />

        <ul className="list-medicaments">
          {medicamentos.map((medicamento) => (
            <li key={medicamento}><Link to={`medicamentos/${medicamento.toLowerCase().replaceAll(" ", "-")
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}>{medicamento}</Link></li>
          ))}
        </ul>

      </div>
    </div>
    </>
  );
};
export default SearchPage;