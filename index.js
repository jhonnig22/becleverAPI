var express = require('express');
var app=express();
var bodyParser = require('body-parser');

const {conn} = require('./db.js');
const {Genero, Businesslocation,Employee} =  require('./db.js');


app.get("/",async function (req, res) {
    let data = await Employee.findAll({
        include:{model:Businesslocation}
    });
    res.send({data});
});


    conn.sync({ force: false }).then(() => {
        app.listen(3001, () => {
          console.log('%s conectado at 3001'); // eslint-disable-line no-console
        });
      });
   


