
//Import dependences
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Initialze app
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;


//Assign port for our app.
app.listen(port);
console.log('App is listening in port ' + port);

