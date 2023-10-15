const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accesToken = req.header("accesToken");

  if (!accesToken)
    return res.json({ error: "El usuario no ha iniciado sesion" });

  try {
    const validToken = verify(accesToken, "password");

    req.user = validToken;

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
