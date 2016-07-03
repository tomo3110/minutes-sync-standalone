
var express = require('express'),
    app = express(),
    path = require('path'),
    logger = require('morgan'),
    helmet = require('helmet'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    http = require('http').Server(app),
    io = require('socket.io')(http);

// view engine setup

// uncomment after placing your favicon in /public
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));



var minutes = require('./io/minutes').init(io);
//
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/api/v1/minutes', minutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:' + process.env.PORT || 3000);
});
