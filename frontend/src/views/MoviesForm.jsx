import React, { useState } from "react";
import axios from "axios";

const MoviesForm = () => {
  const [titulo, setTitulo] = useState("");
  const [director, setDirector] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaEstreno, setFechaEstreno] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      titulo,
      director,
      genero,
      fechaEstreno,
    };

    try {
      const response = await axios.post("http://localhost:5174/movies", newMovie);
      alert(response.data.mensaje);
    } catch (error) {
      alert(error.response.data.error);
    }

    setTitulo("");
    setDirector("");
    setGenero("");
    setFechaEstreno("");
  };

  return (
    <div className="MoviesForm">
      <h1>Añadir película</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          placeholder="Título"
        />
        <input
          type="text"
          value={director}
          onChange={(event) => setDirector(event.target.value)}
          placeholder="Director"
        />
        <input
          type="text"
          value={genero}
          onChange={(event) => setGenero(event.target.value)}
          placeholder="Género"
        />
        <input
          type="date"
          value={fechaEstreno}
          onChange={(event) => setFechaEstreno(event.target.value)}
          placeholder="Fecha de estreno"
        />
        <button type="submit">Añadir película</button>
      </form>
    </div>
  );
};

export default MoviesForm;

