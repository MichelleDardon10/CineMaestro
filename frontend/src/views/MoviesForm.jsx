import React, { useState, useContext } from "react";
import axios from "axios";
import "../styles/MoviesForm-style.css";
import { AuthContext } from "../helpers/AuthContext";

function MoviesForm() {
  const { authState } = useContext(AuthContext);
  const [movieData, setMovieData] = useState({
    titulo: "",
    director: "",
    genero: "",
    fechaEstreno: "",
    UserId: authState.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //
    try {
      const response = await axios.post(
        "http://localhost:5174/movies",
        movieData,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      if (response.status === 201) {
        console.log("Película agregada exitosamente:", response.data.pelicula);
        setMovieData({
          titulo: "",
          director: "",
          genero: "",
          fechaEstreno: "",
        });
      } else {
        console.error("Error al agregar la película:", response.data.error);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div className="moviesForm">
      <h2>Agregar Película</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={movieData.titulo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Director:</label>
          <input
            type="text"
            name="director"
            value={movieData.director}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Género:</label>
          <input
            type="text"
            name="genero"
            value={movieData.genero}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Fecha de Estreno:</label>
          <input
            type="date"
            name="fechaEstreno"
            value={movieData.fechaEstreno}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Agregar Película</button>
        </div>
      </form>
    </div>
  );
}

export default MoviesForm;
