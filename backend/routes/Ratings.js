const express = require("express");
const router = express.Router();
const { Ratings } = require("../models");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const allRatings = await Ratings.findAll({ where: { PostId: postId } });
  res.json(allRatings);
});

router.post("/", async (req, res) => {
  const rating = req.body;
  await Ratings.create(rating);
  res.json(rating);
});
module.exports = router;
