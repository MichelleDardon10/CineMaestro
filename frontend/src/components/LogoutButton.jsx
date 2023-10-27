import React from 'react';

const LogoutButton = ({ onClick }) => {
  return (
    <button className="menu-item" onClick={onClick}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
