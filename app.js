const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const body = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const session = require('express-session');
const fs = require('fs');
const date = require('date-and-time');
const lo = require('lodash')
const request = require('request');
const url = require('url');

let adr = 'http://localhost:10070/~s1131670/P2_NodeJS_Opdracht/70/';
const db = mongoose.connection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');
var wheatherRouter = require('./routes/wheather');

var app = express();

// Handle session

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


// Pasport
app.use(passport.initialize());
app.use(passport.session());

// Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Flash
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/~s1131670/P2_NodeJS_Opdracht/70/public/", express.static(path.join(__dirname, '/public')));

app.use('/~s1131670/P2_NodeJS_Opdracht/70', indexRouter);
app.use('/~s1131670/P2_NodeJS_Opdracht/70/users', usersRouter);
app.use('/~s1131670/P2_NodeJS_Opdracht/70/notes', notesRouter);
app.use('/~s1131670/P2_NodeJS_Opdracht/70/wheather', wheatherRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


getTime = function(){
    let timeObj = {};
    let now = new Date();
    let ddate = date.format(now, 'DD MMM YYYY');
    let time = date.format(now, 'HH:mm');
    return timeObj = {
        date: ddate,
        time: time,
        now: now,
    }
};


module.exports = app;
