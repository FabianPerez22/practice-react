import { NavLink } from 'react-router-dom'

const Header = ({searchs}) => {

    return (
        <>
            <header>
                <h1>Farmacia App</h1>
                {searchs ? <nav> <NavLink to="/home">Inicio</NavLink>{" "} <NavLink to="/search">Buscador</NavLink> </nav> : ""}
            </header>
        </>
    )
}

export default Header
