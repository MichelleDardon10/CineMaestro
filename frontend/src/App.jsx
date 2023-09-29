import React, { useState } from "react";
import "./App.css";
import Login from "./views/Login";
import Signup from "./views/Signup";

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
        {showLogin ? (
          <Login onSwitchToSignup={switchToSignup} />
        ) : (
          <Signup onSwitchToLogin={switchToLogin} />
        )}
      </div>

      {/* {isLogin ? <Login /> : <Signup />}
      <div className='toggle-btn'>
        <button onClick={handleToggle}>
          {isLogin ? 'Registrarse' : 'Iniciar sesión'}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
