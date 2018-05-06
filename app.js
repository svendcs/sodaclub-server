var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bearerToken = require('express-bearer-token');

var routes = require('./routes/index');
var users  = require('./routes/users');
var items  = require('./routes/items');
var announcements  = require('./routes/announcements');

var app = express();

// view engine setup
var viewEngine = require('express-json-views');
app.engine('json', viewEngine({
    // helpers: require('./views/helpers')
}));
app.set('views', './views');
app.set('view engine', 'json');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bearerToken());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/items', items);
app.use('/announcements', announcements);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message)
});


module.exports = app;
