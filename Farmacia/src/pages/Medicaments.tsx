import useSelectState from "../hooks/useSelectState";

const Medicamento = () => {
  const { searchs } = useSelectState()

  return (
    <>
      <div className="info-medicament">
        <h1>Información del medicamento o enfermedad</h1>
        <h2>{!searchs?.error && !searchs.loadingSearch ? searchs?.searchs?.name : searchs?.error}</h2>
        <h3 className="definitions" style={{ transition: "all 1sec", display: searchs?.searchs?.description && !searchs?.error && !searchs.loadingSearch ? "" : "none" }}>{!searchs?.error ? searchs?.searchs?.description : ""}</h3>
      </div>
    </>
  );
};
export default Medicamento;
