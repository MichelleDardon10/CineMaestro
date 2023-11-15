const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//Regresa todos los ratings
router.get("/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const allComments = await Comments.findAll({ where: { MovieId: movieId } });
  res.json(allComments);
});

router.get("/", async (req, res) => {
  const listOfComments = await Comments.findAll();
  res.json(listOfComments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const createdComment = await Comments.create(comment);
  res.json(createdComment);
});

router.delete("/:id", async (req, res) => {
  const commentId = req.params.id;
  try {
    const comments = await Comments.findByPk(commentId);
    if (!comments) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await comments.destroy();
    return res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error deleting Comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
