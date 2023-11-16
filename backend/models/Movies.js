const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Movies = sequelize.define("Movies", {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vista: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    fechaEstreno: {
      type: DataTypes.DATE,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  Movies.associate = (models) => {
    Movies.hasMany(models.Ratings),
      {
        onDelete: "cascade",
      };
    Movies.hasMany(models.Comments),
      {
        onDelete: "cascade",
      };
  };

  return Movies;
};
