var express = require('express');
var logger = require('morgan');

const mwCORS = require('./middlewares/corsMw');
var connectRoute = require("./routes/connectRoute");

var app = express();

require(".//dbConnect/connect");

app.use(logger('dev'));
app.use(express.json());

app.use(mwCORS);

app.use(connectRoute);

module.exports = app;