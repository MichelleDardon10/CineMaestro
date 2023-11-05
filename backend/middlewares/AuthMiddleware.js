//Código con la lógica de revisión de si es válido un token o no

const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    console.log("Verdades");
    return res.json({ error: "El usuario no ha iniciado sesion" });
  } else {
    try {
      const validToken = verify(accessToken, "password");

      req.user = validToken;

      if (validToken) {
        return next();
      }
    } catch (err) {
      return res.json({ error: err });
    }
  }
};

module.exports = { validateToken };
