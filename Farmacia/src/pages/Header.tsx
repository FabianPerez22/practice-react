import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../aplication/hooks';
import { logout } from '../app/users/auth';

interface HeaderProps {
    searchs: boolean;
}

const Header = ({ searchs }: HeaderProps) => {
    const dispatch = useAppDispatch()
    const authState = useAppSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            <header>
                <h1>Farmacia App</h1>
                {authState.user?.name ? <h4>Hola, {authState.user?.name ?? "sin sesion abierta"}</h4> : ""}
                {searchs ? <nav> <NavLink to="/home">Inicio</NavLink> <NavLink to="/search">Buscador</NavLink> <NavLink to="/" onClick={handleLogout}>Cerrar sesion</NavLink> </nav> : ""}
            </header>
        </>
    )
}

export default Header
