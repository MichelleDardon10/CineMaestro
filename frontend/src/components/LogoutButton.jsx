import React from 'react';

const LogoutButton = ({ onClick }) => {
  return (
    <button className="logout-button" onClick={onClick}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;

