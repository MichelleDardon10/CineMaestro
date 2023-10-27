import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ to, label }) => {
  return (
    <Link to={to} className="menu-item">
      {label}
    </Link>
  );
};

export default MenuItem;
