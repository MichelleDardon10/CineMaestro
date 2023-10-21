import React, { useState, useContext } from "react";
import "../styles/log-sign-styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    //Chequea si el usuario existe en la base de datos
    axios.post("http://localhost:5174/auth/login", data).then((response) => {
      //Da un error si no está
      if (response.data.error) {
        alert(response.data.error);
        //Si si está regresa un token y lo guarda en el localStorage,también guarda su información según el token.
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };

  const switchToSignUp = () => {
    navigate("/signup");
  };

  //TODO Asegurar los parametros de contraseña y usuario para que no puedan enviar nulos u otras cosas por el estilo
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
          <button className="iniciar" onClick={switchToSignUp}>
            Registrarse
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
