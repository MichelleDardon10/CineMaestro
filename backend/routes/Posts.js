const express = require("express");
const router = express.Router();
//AQUI SE CREA UNA INSTANCIA DE POSTS QUE ESTA EN MODELS
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
