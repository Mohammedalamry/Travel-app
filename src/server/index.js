// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
 const express = require('express');
// Start up an instance of app
const app = express();
// Require dotenv to secure sensitive data such as api keys
const dotenv = require('dotenv')
dotenv.config()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// requir fetch to get data of  external Api 
const fetch = require('node-fetch');
// Initialize the main project folder
app.use(express.static('dist'));
 
const port = 3001;
// Setup Server
const server = app.listen(port,Listening);
 function Listening(){    

console.log(`server running on localhost:${port}`);

}

app.get('/trips', callback)
  function  callback(req , res){
  
  res.send(projectData);
// res.send(projectData.feeling +"Hi nonde");
// projectData={}
 }
// this is get endpoint for  Mock API
 app.get('/route',callbackmok)
   function callbackmok(req , res){
  
    res.send({messag:"Hello webpack"});
// res.send(projectData.feeling +"Hi nonde");

 }

 //this is post endpoint for post data  that coming from client side .
app.post('/add', creat_new_weatherdata)
projectData ={}
function  creat_new_weatherdata(req , res){ 
// console.log(res.body)
console.log(req.body)
projectData['dateArrive'] = req.body.dateArrive;

projectData['dateDeparture'] = req.body.dateDeparture;
projectData['origin']= req.body.origin;
projectData['destination']= req.body.destination;

projectData['high_temp']= req.body.high_temp;
projectData['low_temp']= req.body.low_temp;
projectData['weather_description']= req.body.weather_description;
projectData['image']= req.body.image;

console.log(projectData);
// projectData={}
// res.send("req"+ projectData.temp );
}
//this is to export app 
exports.app=app;