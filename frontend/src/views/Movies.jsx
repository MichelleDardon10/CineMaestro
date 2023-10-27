import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Movies.css'; // Importa los estilos CSS

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener la lista de películas
    axios.get('http://localhost:5174/movies')
      .then((response) => {
        // Actualiza el estado con los datos de las películas
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las películas: ', error);
      });
  }, []);

  const handleDeleteMovie = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5174/movies/${id}`);
      console.log(response.data); // Maneja la respuesta de éxito según tus necesidades

      // Actualiza el estado de las películas después de borrar una película
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error('Error al borrar la película: ', error);
    }
  };

  return (
    <div className="movies-container">
      <h2 className="movies-title"><strong>Películas</strong></h2>
      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-card">
            <p className="movie-title">{movie.titulo}</p>
            <div className="movie-info">
              <p>Director: {movie.director}</p>
              <p>Género: {movie.genero}</p>
              <p>Año: {movie.año}</p>
            </div>
            <button onClick={() => handleDeleteMovie(movie.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;

