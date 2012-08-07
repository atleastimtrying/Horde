(function() {
  var Player, app, connections, express, io, newMessage, onSocketConnection, players, routes, socket;
  express = require('express');
  routes = require('./routes');
  app = module.exports = express.createServer();
  connections = [];
  app.configure = function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
      secret: 'your secret here'
    }));
    app.use(app.router);
    return app.use(express.static(__dirname + '/public'));
  };
  app.configure('development', function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
  app.configure('production', function() {
    return app.use(express.errorHandler());
  });
  app.get('/', routes.index);
  app.listen(8080);
  console.log("Express server listening on port " + (app.address().port));
  io = require('socket.io');
  Player = (require('./Player')).Player;
  socket = io.listen(app);
  socket.set("log level", 2);
  players = [];
  onSocketConnection = function(client) {
    return client.on('new message', newMessage);
  };
  newMessage = function(data) {
    return this.broadcast.emit("new message", {
      message: data.message,
      type: data.type
    });
  };
  socket.sockets.on('connection', onSocketConnection);
}).call(this);
