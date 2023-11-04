// EN ESTE ARCHIVO SE CREA LA BASE DE DATOS CON SEQUELIZE

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Ratings, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Playlist, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Movies, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };

  return Users;
};
