const express = require("express");
const router = express.Router();
//AQUI SE CREA UNA INSTANCIA DE POSTS QUE ESTA EN MODELS
const { Playlist } = require("../models");

router.get("/", async (req, res) => {
  const listOfPlaylists = await Playlist.findAll();
  res.json(listOfPlaylists);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const playlist = await Playlist.findByPk(id);
  res.json(playlist);
});

router.post("/", async (req, res) => {
  const playlist = req.body;
  await Playlist.create(playlist);
  res.json(playlist);
});

router.delete("/:id", async (req, res) => {
    const playlistId = req.params.id;
    try {
        const playlist = await Playlist.findByPk(playlistId);
        if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
        }
        await playlist.destroy();
        return res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting playlist:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
