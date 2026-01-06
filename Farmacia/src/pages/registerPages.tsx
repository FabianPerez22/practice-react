import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../aplication/hooks'
import { registerUser } from '../app/users/auth'

const registerPages = () => {
    const authState = useAppSelector((state) => state.auth)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleRegister = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const result = await dispatch(registerUser({ name, email, password }))
        if (registerUser.fulfilled.match(result)) {
            navigate("/")
        }
    }

    return (
        <>
            <div className='backgroundStyles'>
                <form className='formRegister' action="" style={{ position: "relative" }}>
                    <h3 style={{ position: "absolute", top: 0, color: "white" }}>Iniciar sesion</h3>
                    <input className='inputsRegister' type="text" placeholder='Nombre' value={name} onChange={e => setName(e.target.value)} />
                    <input className='inputsRegister' type="text" placeholder='Correo' value={email} onChange={e => setEmail(e.target.value)} />
                    <input className='inputsRegister' type="password" placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='buttons' onClick={handleRegister}>Registrarse</button>
                    {authState.error && <p style={{color: "white", position: "absolute", bottom: "35px"}}>{authState.error}</p>}
                    <Link to="/" style={{ position: "absolute", bottom: 6, color: "white" }}> tienes cuenta? Inicia sesion!</Link>
                </form>
            </div>
        </>
    )
}

export default registerPages
