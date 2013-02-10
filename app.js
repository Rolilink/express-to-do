
/**
 * Module dependencies.
 */

var express = require('express')
  , taskroutes = require('./routes/taskRoutes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.set('db-uri','mongodb://localhost/todo-dev');
  app.use(express.errorHandler());
});

app.configure('test',function(){
  app.set('db-uri','mongodb://localhost/todo-test');
});

app.configure('production',function(){
  app.set('db-uri','mongodb://localhost/todo-prod');
});

mongoose.connect(app.get('db-uri'));
app.on('close',function(){
  mongoose.disconnect(function(){});

});

taskroutes(app,mongoose);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

