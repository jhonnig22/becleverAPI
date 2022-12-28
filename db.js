require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/becleverapi`, {
  logging: false, 
  native: true, 
});
sequelize.authenticate().then(()=>{console.log('base de datos conectada')})
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// console.log(capsEntries);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {Businesslocation, 
        Employee,
        Genero,
        Register,
        Registertype,
      } = sequelize.models;


// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Genero.hasOne(Employee,{foreignKey: 'id_genero'}); // la clave foranea se integra en la tabla destino mediante la columna  en este caso por id
Employee.belongsTo(Genero,{foreignKey: 'id_genero'}); // la clave foranea se integla en la tabla origen mediante la columna  en este caso por id



Businesslocation.hasOne(Employee,{foreignKey:'id_businessLocation'});
Employee.belongsTo(Businesslocation,{foreignKey:'id_businessLocation'});


Registertype.hasOne(Register,{foreignKey:'id_register_type'});
Register.belongsTo(Registertype,{foreignKey:'id_register_type'});


Employee.hasOne(Register,{foreignKey:'id_employee'});
Register.belongsTo(Employee,{foreignKey:'id_employee'});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Businesslocation, Employee } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};