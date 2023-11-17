// EN ESTE ARCHIVO SE CREA LA BASE DE DATOS CON SEQUELIZE

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Comments;
  };
  
//prueba