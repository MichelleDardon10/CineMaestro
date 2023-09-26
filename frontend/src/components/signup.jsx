import React, { useState } from 'react'; // Asegúrate de importar React
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg'; // Corregí la ruta del archivo vite.svg
import './log-sign-styles.css';

function SignUp() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}


        <div className="title-box">
          <div className="logo"></div>
          <h1 className="login-title">CineMaestro</h1>
        </div>
        <div className="login-box">
          <h2>Registrarse</h2>
          <form>
          <div className="user-box">
              <input type="text" name="" required="" />
              <label>Correo</label>
            </div>
            <div className="user-box">
              <input type="text" name="" required="" />
              <label>Usuario</label>
            </div>
            <div className="user-box">
              <input type="password" name="" required="" />
              <label>Contraseña</label>
            </div>
            <div class='signup-signup'>
              <Link class='aceptar' href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Aceptar
              </Link>
              <Link className='iniciar' href="/">Iniciar sesión</Link>
            </div>
          </form>
        </div>
    </>
  );
}

export default signup;
