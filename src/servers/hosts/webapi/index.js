var express = require('express'),
    bodyParser = require('body-parser'),
    search = require('../../controllers/search'),
    cors = require('../../middlewares/cors'),

app = express();

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/search', search);

module.exports = app;


