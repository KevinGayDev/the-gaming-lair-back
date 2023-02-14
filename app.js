var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

require(".//dbConnect/connect");

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
