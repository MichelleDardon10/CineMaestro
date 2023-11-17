import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import "../styles/NameIdeas-style.css"; // Importa los estilos CSS

function NameIdeas() {
  let navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5174/nameideas")
      .then((response) => {
        setIdeas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las ideas: ", error);
      });
  }, []);

  const handleDeleteIdea = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5174/nameideas/${id}`,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      console.log(response.data);

      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
    } catch (error) {
      console.error("Error al borrar la idea: ", error);
    }
  };

  const handleAddIdea = async () => {
    const response = await axios
      .post(
        "http://localhost:5174/nameideas",
        {
          title: newIdeaTitle,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          window.location.reload();
        }
      });
  };

  return (
    <div className="name-ideas-container">
      <h2 className="name-ideas-title">
        <strong>IDEAS</strong>
      </h2>
      <div className="input-container">
        <input
          className="name-ideas-input"
          type="text"
          placeholder="Ingrese su idea"
          value={newIdeaTitle}
          onChange={(e) => setNewIdeaTitle(e.target.value)}
        />
        <button className="add-idea-button" onClick={handleAddIdea}>
          Agregar Idea
        </button>
      </div>
      <ul className="name-ideas-list">
        {ideas.map((idea) => (
          <li key={idea.id} className="name-ideas-card">
            <div className="idea-header">
              <p className="idea-title-text">{idea.title}</p>
            </div>
            <div className="idea-buttons">
              {authState.username === idea.username && (
                <button
                  className="delete-idea-button"
                  onClick={() => handleDeleteIdea(idea.id)}
                >
                  Borrar
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NameIdeas;
