import "../styles/ProfilePage-style.css";
import { useParams } from "react-router-dom";
import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  let { id } = useParams();
  let navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const handleDeleteAccount = () => {
    console.log(id);
    axios
      .delete(`http://localhost:5174/auth/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        alert("Cuenta eliminada");
      });
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    navigate("/");
  };

  return (
    <div className="centered-container">
      <button className="goofy-button" onClick={handleDeleteAccount}>
        Borrar cuenta
      </button>
    </div>
  );
}

export default ProfilePage;
