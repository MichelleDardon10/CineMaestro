const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await Users.findOne({
    where: {
      username: username,
    },
  });

  if (existingUser) {
    // If the username already exists, throw an error
    return res.status(409).json({ error: "Nombre no disponible" });
  }

  bcrypt.hash(password, 10).then((hashpw) => {
    Users.create({
      username: username,
      password: hashpw,
    });
  });
  res.status(201).json({ message: "Usuario creado exitosamente" });
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
  res.json("Eliminada");
});

module.exports = router;
