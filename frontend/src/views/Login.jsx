import React, { useState }from 'react';
import '../styles/log-sign-styles.css';

const Login = ({ onSwitchToSignup }) => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para el inicio de sesión
    // Por ejemplo, enviar una solicitud al servidor
    console.log('Iniciar sesión con:', email, password);
  };
  
  return (
    <>
      <div className='title-box'>
        <div className='logo'></div>
        <h1 className='login-title'>CineMaestro</h1>
      </div>
      <div className='login-box'>
        <h2>Iniciar sesion</h2>
        <form onSubmit={handleLogin}>
          <div className='user-box'>
            <input type='text' id="user" value={user} onChange={(e) => setUser(e.target.value)}/>
            <label>Usuario</label>
          </div>
          <div className='user-box'>
            <input type='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label>Contraseña</label>
          </div>
          <div className='signup-signup'>
            <a className='aceptar' href="#">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Aceptar
            </a>
            <button onClick={onSwitchToSignup} className='iniciar'>Registrarse</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;