import React, { useState } from "react";
import "../styles/log-sign-styles.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    console.log(data);
    axios.post("http://localhost:5174/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accesToken", response.data);
        history.push("/");
      }
    });
  };
  //TODO Asegurar los parameros de contraseña y usuario para que no puedan enviar nulos u otras cosas por el estilo
  return (
    <>
      <div className="title-box">
        <div className="logo"></div>
        <h1 className="login-title">CineMaestro</h1>
      </div>
      <div className="login-box">
        <h2>Iniciar sesion</h2>
        <div className="user-box">
          <input
            type="text"
            id="user"
            name="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <label>Usuario</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            id="password"
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label>Contraseña</label>
        </div>
        <div className="signup-signup">
          <button className="iniciar" onClick={login}>
            Aceptar
          </button>
          <Link to="/signup">
            <button className="iniciar">Registrarse</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
