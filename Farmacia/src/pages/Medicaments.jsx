import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Medicamento = () => {
  const { name } = useParams();
  const [definicion, setDefinicion] = useState("");

  useEffect(() => {
    fetch(`https://webapis.cancer.gov/glossary/v1/Terms/Cancer.gov/Patient/es/${name}`)
      .then((response) => response.json())
      .then((data) => setDefinicion(data.definition?.text || "Sin definición"))
      .catch((error) => console.error("Error fetching data:", error));
  }, [name]);

  return (
    <>
     <div className="info-medicament">
      <h1>Información del medicamento o enfermedad</h1>
      <h2>{name.toUpperCase().replaceAll("-", " ")}</h2>
      <h3 className="definitions">{definicion}</h3>
    </div>
    </>
  );
};
export default Medicamento;