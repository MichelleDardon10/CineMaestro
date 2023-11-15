const express = require("express");
const router = express.Router();
const { NameIdeas } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Obtener todas las películas
router.get("/", async (req, res) => {
  try {
    const listOfNameIdeas = await NameIdeas.findAll();
    res.json(listOfNameIdeas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ideas de nombres" });
  }
});

// Agregar una nueva película protegida por autenticación
router.post("/", validateToken, async (req, res) => {
  const { title } = req.body;
  const username = req.user.username;
  try {
    const newIdea = await NameIdeas.create({
      title,
      username,
    });

    res.status(201).json({ newIdea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar la idea" });
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  const { id } = req.params;
  const { username } = req.user;

  try {
    const deletedIdea = await NameIdeas.destroy({
      where: {
        id: id,
        username: username,
      },
    });

    if (deletedIdea) {
      res.json({
        mensaje: "Película eliminada exitosamente",
      });
    } else {
      res.status(404).json({
        error: "Película no encontrada o no tienes permisos para eliminarla",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la película" });
  }
});

module.exports = router;
