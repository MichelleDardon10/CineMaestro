const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server funcionando");
});

const db = require("./models");

//ROUTERS

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const ratingsRouter = require("./routes/Ratings");
app.use("/ratings", ratingsRouter);

db.sequelize.sync().then(() => {
  app.listen(5174, () => {
    console.log("corriendo en puerto 5174");
  });
});
