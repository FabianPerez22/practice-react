import Header from './Header'
import { useAppSelector } from '../aplication/hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function RegisterPage () {
    const users = useAppSelector((state) => state.users)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const  navigate = useNavigate()


    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
    
    const userEmail = users.email
    const userPass = users.password


    if(email !== userEmail || password !== userPass) return


    navigate("/home")
    }

  return (
    <>
    <Header searchs={false} />
      <form className='formRegister' action="">
        {users.email}
        {users.password}
        <input className='inputsRegister' type="text" placeholder='Correo'  value={email} onChange={e => setEmail(e.target.value)} />
        <input className='inputsRegister' type="password" placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)}/>
        <button className='buttons' onClick={handleLogin}>Iniciar sesion</button>
      </form>
    </>
  )
}

export default RegisterPage
