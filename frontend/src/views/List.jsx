import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home-style.css"; // Importa los estilos CSS

function List() {
  let navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener la lista de películas
    axios
      .get("http://localhost:5174/movies")
      .then((response) => {
        // Actualiza el estado con los datos de las películas
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las películas: ", error);
      });
  }, []);

  const handleDeleteMovie = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5174/movies/${id}`);
      console.log(response.data); // Maneja la respuesta de éxito según tus necesidades

      // Actualiza el estado de las películas después de borrar una película
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error al borrar la película: ", error);
    }
  };

  const handleToggleViewed = async (id) => {
    const movieToUpdate = movies.find((movie) => movie.id === id);
    const updatedMovie = { ...movieToUpdate, vista: !movieToUpdate.vista };

    try {
      const response = await axios.put(
        `http://localhost:5174/movies/${id}/marcar-vista`,
        updatedMovie,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      console.log(response.data); // Maneja la respuesta de éxito según tus necesidades

      // Actualiza el estado de las películas después de marcar o desmarcar una película como vista
      setMovies((prevMovies) =>
        prevMovies.map((movie) => (movie.id === id ? updatedMovie : movie))
      );
    } catch (error) {
      console.error(
        "Error al marcar/desmarcar la película como vista: ",
        error
      );
    }
  };

  return (
    <div className="movies-container">
      <h2 className="movies-title">
        <strong>Películas</strong>
      </h2>
      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-card">
            <div
              onClick={() => {
                navigate(`/post/${movie.id}`);
              }}
            >
              <div className="movie-header">
                <p className="movie-title">{movie.titulo}</p>
              </div>

              <div className="movie-info">
                <p>
                  <strong>Género:</strong> {movie.genero}
                </p>
              </div>
            </div>
            <div className="buttons">
              <button onClick={() => handleDeleteMovie(movie.id)}>
                Borrar
              </button>
              <button onClick={() => handleToggleViewed(movie.id)}>
                {movie.vista ? "Desmarcar como vista" : "Marcar como vista"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
