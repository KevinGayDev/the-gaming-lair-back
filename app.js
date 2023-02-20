var express = require('express');
var logger = require('morgan');

const mwCORS = require('./middlewares/corsMw');

const connectRoute = require("./routes/connectRoute");
const gamesRoute = require("./routes/gamesRoute");
const profileRoute = require("./routes/profileRoute");

var app = express();

require(".//dbConnect/connect");

app.use(logger('dev'));
app.use(express.json());

app.use(mwCORS);
app.use(connectRoute);
app.use(gamesRoute);
app.use(profileRoute);

module.exports = app;