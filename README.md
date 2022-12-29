# becleverAPI

el proyecto lo corro en visual studio code <BR>
1-clonar proyecto <BR>
2-tener instalado node.js <BR>
3-npm install, instalara todas dependencias usadas para el proyecto <BR>
4-.env estan las variables de entorno con los datos de la db mysql  <BR>
5-en el archivo db.js line 10  completar el nombre de la db si es diferente <BR>
6- npm start levanta el proyecto <BR>
7- postman para las solicitudes http <BR>
8- POST >> http://localhost:3001/ingreso <BR>
{
        "id_employee":2,
        "date":"1993-12-02",
        "id_register_type":1
        
}

9- POST >> http://localhost:3001/egreso <BR>
{
        "id_employee":1,
        "date":"12/03/1993",
        "id_register_type":2
        
}
10- POST >> http://localhost:3001/search <BR>
{
        "dateFrom":"1993-02-12",
        "dateTo":"1994-02-12",
        "filter":"",
        "location":1
        
}
<BR>
11 - GET >> http://localhost:3001/average?dateFrom=1993-11-02&dateTo=1993-12-02
