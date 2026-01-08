import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../app/users/auth';
import useSelectState from '../hooks/useSelectState';
import useAuth from '../hooks/useAuth';

function LoginPage() {
    const { auth } = useSelectState()
    const { login } = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const result = login(email, password)
        if (loginUser.fulfilled.match((await result))) {
            navigate("/home")
        }
    }

    return (
        <>
            <div className='backgroundStyles'>
                <form className='formRegister' action="" style={{ position: "relative" }}>
                    <h3 style={{ position: "absolute", top: 0, color: "white" }}>Iniciar sesion</h3>
                    <input className='inputsRegister' type="text" placeholder='Correo' value={email} onChange={e => setEmail(e.target.value)} />
                    <input className='inputsRegister' type="password" placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='buttons' onClick={handleLogin}>Iniciar sesion</button>
                    {auth.error && <p style={{ color: "white", position: "absolute", bottom: "35px" }}>{auth.error}</p>}
                    <Link to="/register" style={{ position: "absolute", bottom: 6, color: "white" }}>No tienes cuenta? Registrate!</Link>
                </form>
            </div>
        </>
    )
}

export default LoginPage
