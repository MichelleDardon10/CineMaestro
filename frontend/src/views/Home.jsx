import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home-style.css"; // Importa los estilos CSS

function Home() {
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
      const response = await axios.delete(
        `http://localhost:5174/movies/${id}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      console.log(response.data);

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
      console.log(
        "Antes de la actualización en el backend. Estado actual:",
        movies
      );

      const response = await axios.put(
        `http://localhost:5174/movies/${id}/marcar-vista`,
        updatedMovie,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      //hola
      console.log("Respuesta del backend:", response.data);

      // Actualiza el estado de las películas después de marcar o desmarcar una película como vista
      setMovies((prevMovies) => {
        const newMovies = prevMovies.map((movie) =>
          movie.id === id ? updatedMovie : movie
        );
        console.log("Después de la actualización del estado:", newMovies);
        return newMovies;
      });
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
        <strong>PELÍCULAS</strong>
      </h2>
      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-card">
            <div
              className="movie-header"
              onClick={() => {
                navigate(`/post/${movie.id}`);
              }}
            >
              <p className="movie-title">{movie.titulo}</p>
              <div className="movie-info">
                <p>
                  <strong>Género:</strong> {movie.genero}
                </p>
              </div>
            </div>
            <div className="buttons">
              <button
                className="delete-button"
                onClick={() => handleDeleteMovie(movie.id)}
              >
                Borrar
              </button>
              <button
                className="view-button"
                onClick={() => handleToggleViewed(movie.id)}
              >
                {movie.vista ? "Desmarcar como vista" : "Marcar como vista"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
