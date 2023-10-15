const express = require("express");
const router = express.Router();
const { Ratings } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const allRatings = await Ratings.findAll({ where: { PostId: postId } });
  res.json(allRatings);
});

router.post("/", validateToken, async (req, res) => {
  const rating = req.body;
  const username = req.user.username;
  rating.username = username;
  await Ratings.create(rating);
  res.json(rating);
});
module.exports = router;
