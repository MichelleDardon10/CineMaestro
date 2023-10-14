// EN ESTE ARCHIVO SE CREA LA BASE DE DATOS CON SEQUELIZE

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Ratings),
      {
        onDelete: "cascade",
      };
  };
  return Posts;
};
