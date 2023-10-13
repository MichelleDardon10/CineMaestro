const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");
//AQUI SE CREA UNA INSTANCIA DE POSTS QUE ESTA EN MODELS

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hashpw) => {
    Users.create({
      username: username,
      password: hashpw,
    });
  });
  res.json("FUNCIONA");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "El usuario no existe" });
    return;
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Contraseña incorrecta" });
    else {
      const accesToken = sign(
        { username: user.username, id: user.id },
        "password"
      );
      res.json(accesToken);
    }
  });
});

module.exports = router;
