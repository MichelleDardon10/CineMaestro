import React from "react";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import LogoutButton from "./LogoutButton";
import "../styles/Navbar.css";
import { useLocation } from "react-router-dom";

const Navbar = ({ authState, logout }) => {
  const location = useLocation();

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor:
          location.pathname === "/login"
            ? "transparent"
            : "rgba(128, 128, 128, 0.5)",
        boxShadow: "0 15px 25px rgba(0, 0, 0, 0.6)",
      }}
    >
      {location.pathname !== "/login" && <Logo />}
      <div className="navbar-menu">
        {location.pathname !== "/" && location.pathname !== "/login" && (
          <div className="MoviesItem">
            <MenuItem to="/" label="Home" />
          </div>
        )}

        {authState.status ? (
          <div className="MoviesItem">
            <div className="horizontal-menu">
              <MenuItem to="/AddMovie" label="Añadir Pelicula" />
              {location.pathname !== "/Playlist" && (
                <MenuItem to="/Playlist" label="Playlist" />
              )}
              {location.pathname !== "/ProfilePage" && (
                <MenuItem to="/ProfilePage" label="Perfil" />
              )}
              <LogoutButton onClick={logout} />
            </div>
          </div>
        ) : location.pathname !== "/login" ? (
          <div className="MoviesItem">
            <MenuItem to="/login" label="Login" />
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
