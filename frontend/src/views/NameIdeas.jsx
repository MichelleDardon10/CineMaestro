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
    // Realiza una solicitud GET para obtener la lista de películas
    axios
      .get("http://localhost:5174/nameideas")
      .then((response) => {
        // Actualiza el estado con los datos de las películas
        setIdeas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las películas: ", error);
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
      console.log(response.data); // Maneja la respuesta de éxito según tus necesidades

      // Actualiza el estado de las películas después de borrar una película
      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
    } catch (error) {
      console.error("Error al borrar la película: ", error);
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
    <div className="movies-container">
      <h2 className="movies-title">
        <strong>IDEAS</strong>
      </h2>
      <div>
        <input className = "input"
          type="text"
          placeholder="Ingrese su idea"
          value={newIdeaTitle}
          onChange={(e) => setNewIdeaTitle(e.target.value)}
        />

        <button onClick={handleAddIdea}>Add Idea</button>
      </div>
      <ul className="movies-list">
        {ideas.map((idea) => (
          <li key={idea.id} className="movie-card">
            <div>
              <div className="movie-header">
                <p className="movie-title">{idea.title}</p>
              </div>
            </div>
            <div className="buttons">
              {/* Step 3: Render delete button based on username */}
              {authState.username === idea.username && (
                <button onClick={() => handleDeleteIdea(idea.id)}>
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
