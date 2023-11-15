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

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const ratingsRouter = require("./routes/Ratings");
app.use("/ratings", ratingsRouter);
const moviesRouter = require("./routes/Movies");
app.use("/movies", moviesRouter);
const playlistRouter = require("./routes/Playlist");
app.use("/playlist", playlistRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const nameideasRouter = require("./routes/NameIdeas");
app.use("/nameideas", nameideasRouter);

db.sequelize.sync().then(() => {
  app.listen(5174, () => {
    console.log("corriendo en puerto 5174");
  });
});
