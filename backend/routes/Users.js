const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

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

//Aqui se crea un token y se regresa si y solo si el usuario existe en la base de datos, osea que puede hacer login
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
      const accessToken = sign(
        { username: user.username, id: user.id },
        "password"
      );
      res.json({ token: accessToken, username: username, id: user.id });
    }
  });
});

router.get("/check", validateToken, async (req, res) => {
  res.json(req.user);
});

router.delete("/:userId", validateToken, async (req, res) => {
  const userId = req.params.userId;
  await Users.destroy({
    where: {
      id: userId,
    },
  });
});

module.exports = router;
