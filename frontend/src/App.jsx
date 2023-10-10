import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";

export function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            // aqui ponen las rutas para diferentes paginas que tengamos
          </Routes>
        </Router>
      </div>
    </>
  );
}
