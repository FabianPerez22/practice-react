import Header from "./Header";
import useMedicaments from "../hooks/useMedicaments";
import { useEffect } from "react";
import useSelectState from "../hooks/useSelectState";

const Home = () => {

  const { removeMedicament, getAllRegisters } = useMedicaments()
  const { userLoader, userId, registers } = useSelectState()

  const fetchRegisters = async () => {
    if (!userId) return;
    await getAllRegisters(userId)
  };

  const maxLenghts = (text: string) => {
    const maxText = 380;
    let formatedText = text
    if (text.length >= maxText) {
      formatedText = text.slice(0, maxText) + "..."
    }
    return formatedText
  }

  useEffect(() => {
    fetchRegisters()
  }, [userId])

  return (
    <>
      <Header searchs={true} />
      <div className="medicamentsContainer">
        {registers?.map(med =>
          <div key={med?.id} className="definitions medicamentsDatabase" >
            <button onClick={() => removeMedicament(med?.id) } type="button" className="closeButton buttons">X</button>
            <h3>{med?.name}</h3>
            <p  >{maxLenghts(med?.description)}</p>
          </div>
        )}
      </div>
    </>
  )
};

export default Home;
