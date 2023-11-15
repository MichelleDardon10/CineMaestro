import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import Post from "./views/Post";
import Navbar from "./components/Navbar";
import MoviesForm from "./views/MoviesForm";
import NameIdeas from "./views/NameIdeas";
import ProfilePage from "./views/ProfilePage";
import PlaylistPage from "./views/Playlist";
import List from "./views/List";
import { AuthContext } from "./helpers/AuthContext";
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
      .get("http://localhost:5174/auth/check", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
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
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    window.location.href = "/";
  };

  return (
    <>
      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            <Navbar authState={authState} logout={logout} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/AddMovie" element={<MoviesForm />} />
              <Route path="/nameideas" element={<NameIdeas />} />
              <Route path="/playlist" element={<PlaylistPage />} />
              <Route path="/profilePage" element={<ProfilePage />} />
              <Route path="/list" element={<List />} />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </div>
    </>
  );
}
