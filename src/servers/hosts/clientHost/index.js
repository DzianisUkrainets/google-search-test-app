var express = require('express');
var clientApp = express();

clientApp.use(express.static(__dirname + "/../../../build"));

module.exports = clientApp;
