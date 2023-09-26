import React, { useState } from 'react';
import '../styles/log-sign-styles.css';

const Signup = ({ onSwitchToLogin }) => {

  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    //
    console.log('Registrarse con:', email, user, password);
  };

  return (
    <>
    <div className="title-box">
      <div className="logo"></div>
      <h1 className="login-title">CineMaestro</h1>
    </div>
    <div className="login-box">
      <h2>Registrarse</h2>
      <form onSubmit={handleSignup}>
      <div className="user-box">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Correo</label>
        </div>
        <div className="user-box">
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
          <label>Usuario</label>
        </div>
        <div className="user-box">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>Contraseña</label>
        </div>
        <div class='signup-signup'>
          <a class='aceptar' href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Aceptar
          </a>
          <button onClick={onSwitchToLogin} className='iniciar' >Iniciar Sesión</button>
        </div>
      </form>
    </div>
    </>
  );
}

export default Signup;