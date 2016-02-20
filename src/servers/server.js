var express = require('express');
var app = express();
var port = 3002;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.json({ message: 'hello world'})
});



app.listen(port);


var clientApp = express();
var clientPort = 9002;

clientApp.use(express.static(__dirname + "/../build"));

clientApp.listen(clientPort);
