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
          location.pathname === "/login" || location.pathname === "/signup"
            ? "transparent"
            : "rgba(128, 128, 128, 0.5)",
        boxShadow: "0 15px 25px rgba(0, 0, 0, 0.6)",
      }}
    >
      {location.pathname !== "/login" && location.pathname !== "/signup" && <Logo />}
        <div className="navbar-menu">
        {location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/signup" &&(
          <div className="MoviesItem">
            <MenuItem to="/" label="Home" />
          </div>
        )}

        {authState.status ? (
          <div className="MoviesItem">
            <div className="horizontal-menu">
              {location.pathname !== "/AddMovie" && (
                <MenuItem to="/AddMovie" label="Añadir Pelicula" />
              )}
              {location.pathname !== "/nameideas" && (
                <MenuItem to="/nameideas" label="Name movies" />
              )}
              {location.pathname !== "/Playlist" && (
                <MenuItem to="/Playlist" label="Playlist" />
              )}
              {location.pathname !== "/ProfilePage" && (
                <MenuItem to="/ProfilePage" label="Perfil" />
              )}
              <LogoutButton onClick={logout} />
            </div>
          </div>
        ) : location.pathname !== "/login" && location.pathname !== "/signup" ? (
          <div className="MoviesItem">
            <MenuItem to="/login" label="Login" />
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
