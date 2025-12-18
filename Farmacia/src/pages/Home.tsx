import Header from "./Header";
import { useAppSelector } from "../aplication/hooks";
import { Medicaments } from "../app/medicaments/medicamentSlice";
import useMedicaments from "../aplication/useMedicaments";

const Home = () => {

  const medicament: Medicaments[] = useAppSelector((state) => state.medicament)


  const { removeMedicament } = useMedicaments()

  return (

    <>
      <Header searchs={true} />
      <div className="medicamentsContainer">
        {medicament.map(med =>
          <div key={med.id} className="definitions medicamentsDatabase" >
            <button onClick={() => removeMedicament(med.id)} type="button" className="closeButton buttons">X</button>
            <h3>{med.name}</h3>
            <p>{med.description}</p>
          </div>
        )}
      </div>

    </>
  )
};

export default Home;
