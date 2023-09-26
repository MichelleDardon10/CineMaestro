const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server funcionando");
});

app.listen(5174, () => {
  console.log("corriendo en puerto 5174");
});
