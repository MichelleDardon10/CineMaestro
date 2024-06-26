const express = require("express");
const router = express.Router();
const { Ratings } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//Regresa todos los ratings
router.get("/byId/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const allRatings = await Ratings.findAll({ where: { MovieId: movieId } });
  res.json(allRatings);
});

router.get("/", async (req, res) => {
  const listOfRatings = await Ratings.findAll();
  res.json(listOfRatings);
});

//Postea un nuevo rating, el parametro validateToken hace que solo lo haga si está valido el usuario
router.post("/", validateToken, async (req, res) => {
  const rating = req.body;
  const { MovieId } = req.body;
  const username = req.user.username;
  const UserId = req.user.id;

  const found = await Ratings.findOne({
    where: { MovieId: MovieId, UserId: UserId },
  });
  console.log(found);
  if (!found) {
    rating.username = username;
    fullRating = await Ratings.create(rating);
    res.status(201).json(fullRating);
  } else {
    fullRating = await found.update(rating);
    res.json(fullRating);
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  const UserId = req.user.id;
  const MovieId = req.params.id;

  try {
    const found = await Ratings.findOne({
      where: { MovieId, UserId },
    });

    if (!found) {
      return res.status(404).json({ error: "No rating from user" });
    } else {
      await Ratings.destroy({
        where: { MovieId, UserId },
      });
      return res.status(200).send();
    }
  } catch (error) {
    console.error("Error deleting rating:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
