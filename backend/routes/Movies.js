const express = require("express");
const router = express.Router();
const { Movies } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Obtener todas las películas
router.get("/", async (req, res) => {
  try {
    const listOfMovies = await Movies.findAll();
    res.json(listOfMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

// Agregar una nueva película protegida por autenticación
router.post("/", validateToken, async (req, res) => {
  const { titulo, director, genero, fechaEstreno } = req.body;
  const { username } = req.user;
  // Puedes agregar campos adicionales como "vista" (si el usuario ya vio la película) en el cuerpo de la solicitud

  try {
    const newMovie = await Movies.create({
      titulo,
      director,
      genero,
      fechaEstreno, // Fecha de lanzamiento de la película
      username, // Asocia el nombre de usuario con la película
    });

    res.status(201).json({
      mensaje: 'Película agregada exitosamente',
      pelicula: newMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar la película' });
  }
});

// Marcar una película como vista (usuario autenticado)
router.put("/:id/marcar-vista", validateToken, async (req, res) => {
  const { id } = req.params;
  const { username } = req.user; // Obtén el nombre de usuario desde el token

  try {
    const updatedMovie = await Movies.update({ vista: true }, {
      where: {
        id: id,
        username: username,
      },
    });

    if (updatedMovie[0] === 1) {
      res.json({
        mensaje: 'Película marcada como vista',
      });
    } else {
      res.status(404).json({ error: 'Película no encontrada o no tienes permisos para marcarla como vista' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al marcar la película como vista' });
  }
});

// Listar películas marcadas como "vistas" (usuario autenticado)
router.get("/vistas", validateToken, async (req, res) => {
  const { username } = req.user; // Obtén el nombre de usuario desde el token

  try {
    const listOfVistaMovies = await Movies.findAll({
      where: {
        vista: true,
        username: username,
      },
    });
    res.json(listOfVistaMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las películas marcadas como vistas' });
  }
});

// Borrar una película por su ID (solo si el usuario coincide con el creador de la película)
router.delete("/:id", validateToken, async (req, res) => {
  const { id } = req.params;
  const { username } = req.user; // Obtén el nombre de usuario desde el token

  try {
    const deletedMovie = await Movies.destroy({
      where: {
        id: id,
        username: username, // Asegura que el nombre de usuario coincida
      },
    });

    if (deletedMovie) {
      res.json({
        mensaje: 'Película eliminada exitosamente',
      });
    } else {
      res.status(404).json({ error: 'Película no encontrada o no tienes permisos para eliminarla' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la película' });
  }
});

module.exports = router;