const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('businesslocation', {
    id_businessLocation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type:DataTypes.STRING
    },   
    active:{
      type:DataTypes.BOOLEAN
    }
   
  },{timestamps: false});
};