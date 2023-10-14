import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import Post from "./views/Post";

export function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Link to="/login" className="login-link">
            Login
          </Link>
          <Link to="/" className="login-link">
            Home
          </Link>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post/:id" element={<Post />} />
            // aqui ponen las rutas para diferentes paginas que tengamos
          </Routes>
        </Router>
      </div>
    </>
  );
}
