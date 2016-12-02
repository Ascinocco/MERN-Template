var Application = (function(db){

  // modules
  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var passport = require('passport');

  // models
  // var User = require('../models/User.js');

  // routes
  // var indexRoutes = require('../routes/index.routes.js');

  // passport config
  //require('./passport.js');

  // create express app instance
  var app = express();

  // configure app
  app.use(favicon('./public/favicon/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  // Need to build out passport first
  // app.use(passport.initialize());

  // add routes
  //app.use('/', indexRoutes);

  // catch and forward 404 errors
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

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

  return app;

})();

module.exports = Application;
