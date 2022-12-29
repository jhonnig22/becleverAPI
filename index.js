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
    // console.log(register);
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
                include:{model:Businesslocation},
                where:{
                    [Op.or]:[{name:{[Op.like]:`${filter}%`}},
                             {surname:{[Op.like]:`${filter}%`}}
                            ],
                    id_businessLocation:location        
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
app.get("/average",async function (req, res) {
    let dataGet = req.query;
   try {
        let desde =  dataGet.dateFrom;
        let hasta = dataGet.dateTo;
        console.log(desde,hasta);
    // console.log(register);
       
        let result = await conn.query(`select COUNT(*) as value,generos.name as genero, businesslocations.name from registers 
        LEFT JOIN employees on employees.id_employee = registers.id_employee
        LEFT JOIN businesslocations ON businesslocations.id_businessLocation = employees.id_businessLocation
        LEFT JOIN generos ON generos.id_genero = employees.id_genero
        WHERE registers.date BETWEEN '${desde}' AND '${hasta}'
        GROUP by businesslocations.name, generos.name`);
        
        //total = masculinos+femeninos;
        // % = masculino * 100 / total 
        
        res.send(result);
    //     // console.log(result[0]);
    //   })
   } catch (error) {
    console.log(error);
   }
   
});

    conn.sync({ force: false }).then(() => {
        app.listen(3001, () => {
          console.log('%s conectado at 3001'); 
        });
      });
   


