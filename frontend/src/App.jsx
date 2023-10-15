import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import Post from "./views/Post";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

//TODO LA CONSTANTE AUTHSTATE PUEDE SER UN OBJETO CON LA INFO DE USUARIO
export function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost/5174/auth/check", {
        headers: {
          accesToken: localStorage.getItem("accesToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accesToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <>
      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            <div className="navbar">
              {!authState.status ? (
                <>
                  <Link to="/login">Login</Link>
                </>
              ) : (
                <button onClick={logout}>Cerrar sesión </button>
              )}

              <Link to="/">Home</Link>
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/post/:id" element={<Post />} />
              // aqui ponen las rutas para diferentes paginas que tengamos
            </Routes>
          </Router>
        </AuthContext.Provider>
      </div>
    </>
  );
}
