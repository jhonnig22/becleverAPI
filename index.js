var express = require('express');
var app=express();
var bodyParser = require('body-parser');

const {conn} = require('./db.js');
const {Genero, Businesslocation,Employee,Register} =  require('./db.js');
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
// Generar los servicios correspondientes, los cuales nos permitan guardar en base
// de datos, los ingresos y egresos del personal.
// Function register(idEmployee, date, registerType, businessLocation)
app.post("/ingreso",async function (req, res) {
    let dataPost = req.body;
    
   try {
    let register = await Register.create({
        id_employee:dataPost.id_employee,
        date: dataPost.date,
        id_register_type:dataPost.id_register_type
    });
  
        res.send({'success':true});
     
   } catch (error) {
    console.log(error);
   }
  
   
    // let data = await Employee.findAll({
    //     include:{model:Businesslocation}
    // });
   
});

app.post("/egreso",async function (req, res) {
    let dataPost = req.body;
    
   try {
    let register = await Register.create({
        id_employee:dataPost.id_employee,
        date: dataPost.date,
        id_register_type:dataPost.id_register_type
    });
  
        res.send({'success':true});
     
   } catch (error) {
    console.log(error);
   }
  
   
    // let data = await Employee.findAll({
    //     include:{model:Businesslocation}
    // });
   
});


    conn.sync({ force: false }).then(() => {
        app.listen(3001, () => {
          console.log('%s conectado at 3001'); // eslint-disable-line no-console
        });
      });
   


