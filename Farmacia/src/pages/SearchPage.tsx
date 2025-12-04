import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const SearchPage = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const buscarMedicamento = (nombre: string) => {
    let formatName = nombre?.replaceAll(" ", "-");

    const url = import.meta.env.VITE_BASE_URL;

    fetch(`${url}name/${formatName?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "")}?matchType=Begins&size=10`)
      .then((response) => response.json())
      .then((data) =>
        setMedicamentos(
          data?.map((item: { termName: string }) => item)
        )
      )
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <>
      <Outlet />
      <div className="container-list">
        <div className="list-container">
          <h1>
            Lista de <br /> Medicamentos <br /> y <br /> enfermedades
          </h1>
          <p>Buscar medicamento</p>

          <button onClick={() => buscarMedicamento(busqueda)}>Buscar</button>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Escribe el nombre del medicamento"
          />

          <ul className="list-medicaments">
            {medicamentos?.map((medicamento: string) => (
              <li key={medicamento}>
                <Link
                  to={`medicamentos/${medicamento
                    ?.toLowerCase()
                    ?.replaceAll(" ", "-")
                    ?.normalize("NFD")
                    ?.replace(/[\u0300-\u036f]/g, "")}`}
                >
                  {medicamento}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default SearchPage;
