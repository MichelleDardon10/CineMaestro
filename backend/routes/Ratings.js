const express = require("express");
const router = express.Router();
const { Ratings } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//Regresa todos los ratings
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const allRatings = await Ratings.findAll({ where: { PostId: postId } });
  res.json(allRatings);
});

//Postea un nuevo rating, el parametro validateToken hace que solo lo haga si está valido el usuario
router.post("/", validateToken, async (req, res) => {
  const rating = req.body;
  const { PostId } = req.body;
  const username = req.user.username;
  const UserId = req.user.id;

  const found = await Ratings.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  console.log(PostId);
  console.log(UserId);
  if (!found) {
    rating.username = username;
    await Ratings.create(rating);
    res.json(rating);
  } else {
    await found.update(rating);
    res.json(rating);
  }
});
module.exports = router;
