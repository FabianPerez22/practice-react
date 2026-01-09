import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import { URLBACKEND } from "../CONST/Consts";
import useSelectState from "../hooks/useSelectState";
import useMedicaments from "../hooks/useMedicaments";
import Alert from "../components/Alert";

const SearchPage = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const { userId, searchError } = useSelectState()
  const { searchMedicament, addMedicament } = useMedicaments()

  const buscarMedicamento = (nombre: string) => {
    let formatName = nombre?.replaceAll(" ", "-");
    fetch(`${URLBACKEND}farmacia/name/${formatName?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "")}?matchType=Begins&size=10`)
      .then((response) => response.json())
      .then((data) =>
        setMedicamentos(
          data?.map((item: { termName: string }) => item)
        )
      )
      .catch((error) => console.error("Error fetching data:", error ));
  };

  return (
    <>
      <Outlet />
      <Header searchs={true} />
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
            {medicamentos?.map((medicamento: any) => (
              <div className="searchContainers">
                <button key={`${medicamento}99`} className="buttons searchButton"
                  onClick={async (e) => {
                    e.preventDefault()
                    let name = medicamento
                    await addMedicament({ name, userId })
                  }}>+</button>
                <li key={medicamento}>
                  <Link
                    onClick={async (e) => {
                      e.preventDefault()
                      await searchMedicament(medicamento)
                    }}
                    to={`medicamentos/${medicamento
                      ?.toLowerCase()
                      ?.replaceAll(" ", "-")
                      ?.normalize("NFD")
                      ?.replace(/[\u0300-\u036f]/g, "")}`}>
                    {medicamento}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <Alert message={`${searchError ? "Hubo un error, no se pudo guardar" : "Guardado con exito"}`} />
    </>
  );
};
export default SearchPage;
