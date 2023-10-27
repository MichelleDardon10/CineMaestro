import React, { useState } from 'react';
import axios from 'axios';

const MoviesForm = () => {
  const [titulo, setTitulo] = useState('');
  const [director, setDirector] = useState('');
  const [genero, setGenero] = useState('');
  const [año, setAño] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      titulo,
      director,
      genero,
      año: parseInt(año),
    };

    try {
      const response = await axios.post('http://localhost:5174/movies', newMovie);

      if (response.status === 201) {
        console.log('Película agregada exitosamente:', response.data.pelicula);
        // Puedes agregar aquí lógica adicional, como limpiar el formulario
      } else {
        console.error('Error al agregar la película:', response.data.error);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </label>
      <br />
      <label>
        Director:
        <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} />
      </label>
      <br />
      <label>
        Género:
        <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} />
      </label>
      <br />
      <label>
        Año:
        <input type="number" value={año} onChange={(e) => setAño(e.target.value)} />
      </label>
      <br />
      <button type="submit">Agregar Película</button>
    </form>
  );
};

export default MoviesForm;

