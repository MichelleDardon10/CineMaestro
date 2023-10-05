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
      </div> */}
    </>
  );
}
