var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParse = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine("html",require("ejs").__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.static(path.join(__dirname,"uploads")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParse.json({limit: '500mb'}));
app.use(bodyParse.urlencoded({limit: '500mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
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

module.exports = app;
