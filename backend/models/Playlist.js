// EN ESTE ARCHIVO SE CREA LA BASE DE DATOS CON SEQUELIZE

module.exports = (sequelize, DataTypes) => {
  const Playlists = sequelize.define("Playlist", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Playlists;
};
