var express = require('express');
var app=express();
var bodyParser = require('body-parser')


app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
 
app.get("/", function (req, res) {
    res.send({ok:true});
});

var server = app.listen(3001,function(){
    console.log('inicio');
})



