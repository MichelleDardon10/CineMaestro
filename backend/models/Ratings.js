// EN ESTE ARCHIVO SE CREA LA BASE DE DATOS CON SEQUELIZE

module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define("Ratings", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Ratings;
};
