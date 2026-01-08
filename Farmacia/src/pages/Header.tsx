import { NavLink } from 'react-router-dom'
import useSelectState from '../hooks/useSelectState';
import useAuth from '../hooks/useAuth';

interface HeaderProps {
    searchs: boolean;
}

const Header = ({ searchs }: HeaderProps) => {
    const { auth } = useSelectState()
    const { userLogout } = useAuth()

    const handleLogout = () => userLogout()
    
    return (
        <>
            <header>
                <h1>Farmacia App</h1>
                {auth.user?.name ? <h4>Hola, {auth.user?.name ?? "sin sesion abierta"}</h4> : ""}
                {searchs ? <nav> <NavLink to="/home">Inicio</NavLink> <NavLink to="/search">Buscador</NavLink> <NavLink to="/" onClick={handleLogout}>Cerrar sesion</NavLink> </nav> : ""}
            </header>
        </>
    )
}

export default Header
