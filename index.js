var express = require('express');
const {Op} = require('sequelize');
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
    
});

app.post("/egreso",async function (req, res) {
    let dataPost = req.body;
    
   try {
    let register = await Register.create({
        id_employee:dataPost.id_employee,
        date: dataPost.date,
        id_register_type:dataPost.id_register_type
    });
    console.log(register);
        res.send({'success':true});
     
   } catch (error) {
    console.log(error);
   }
   
});
// Generar un servicio el cual liste la cantidad de ingresos y egresos dada una fecha
// desde – hasta, que se pueda filtrar por nombre o apellido y sucursal.
// Function search(dateFrom, dateTo , descriptionFilter,
// businessLocation)
app.post("/search",async function (req, res) {
    let dataPost = req.body;
    if(Object.entries(dataPost).length === 0){
        res.send({'msg':'no se enviaron parametros de busqueda'});
    }
    else{
        
        try {
          let desde =  dataPost.dateFrom;
          let hasta = dataPost.dateTo;
          let filter = dataPost.filter;
          let location =  dataPost.location;

      let result =  await Register.findAll({
        include:{model:Employee,
                where:{
                    [Op.or]:[{name:{[Op.like]:`${filter}%`}},
                             {surname:{[Op.like]:`${filter}%`}}
                            ]
                }
               },
        where:{
           date:{[Op.between]: [desde, hasta]}
           
        }
        }); 
        // console.log(result)
        res.send(result);
     
        } catch (error) {
        console.log(error);
        }
    }
    
   
});


    conn.sync({ force: false }).then(() => {
        app.listen(3001, () => {
          console.log('%s conectado at 3001'); // eslint-disable-line no-console
        });
      });
   


