const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const NameIdeas = sequelize.define("NameIdeas", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return NameIdeas;
};
