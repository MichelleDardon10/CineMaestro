import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";

export function App() {
  const [showLogin, setShowLogin] = useState(true);

  const switchToLogin = () => {
    setShowLogin(true);
  };

  const switchToSignup = () => {
    setShowLogin(false);
  };

  // const [isLogin, setIsLogin] = useState(true);

  // const handleToggle = () => {
  //   setIsLogin(!isLogin);
  // };

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                showLogin ? (
                  <Login onSwitchToSignup={switchToSignup} />
                ) : (
                  <Signup onSwitchToLogin={switchToLogin} />
                )
              }
            />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
