import Header from './Header'
import { useAppDispatch, useAppSelector } from '../aplication/hooks'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { loginUser } from '../app/users/auth';

function LoginPage() {
    const authState = useAppSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const result = await dispatch(loginUser({ email, password }))
        if (loginUser.fulfilled.match(result)) {
            navigate("/home")
        }
    }

    return (
        <>
            <Header searchs={false} />
            <form className='formRegister' action="" style={{position: "relative"}}>
                <h3 style={{position: "absolute", top: 0, color: "white"}}>Iniciar sesion</h3>
                <input className='inputsRegister' type="text" placeholder='Correo' value={email} onChange={e => setEmail(e.target.value)} />
                <input className='inputsRegister' type="password" placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)} />
                <button className='buttons' onClick={handleLogin}>Iniciar sesion</button>
                {authState.error && <p>{authState.error}</p>}
                <Message errorMessage={"Credenciales incorrectas"} />
                <Link to="/register" style={{position: "absolute", bottom: 6, color: "white"}}>No tienes cuenta? Registrate!</Link>
            </form>
        </>
    )
}

export default LoginPage
