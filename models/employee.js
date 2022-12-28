const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('employee', {
    id_employee: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type:DataTypes.STRING
    },
    surname:{
        type:DataTypes.STRING
    },
    id_genero:{
        type:DataTypes.INTEGER
    },   
    id_businessLocation:{
        type:DataTypes.INTEGER
    }, 
   
  },{timestamps: false});
};