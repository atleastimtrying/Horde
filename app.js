(function() {
  var Player, app, connections, express, io, newMessage, onClientDisconnect, onMovePlayer, onNewPlayer, onSocketConnection, playerById, players, routes, socket;

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
    client.on('disconnect', onClientDisconnect);
    client.on('new message', newMessage);
    client.on('new player', onNewPlayer);
    return client.on('move player', onMovePlayer);
  };

  onClientDisconnect = function() {
    var removePlayer;
    console.log("player disconnected " + this.id);
    removePlayer = playerById(this.id);
    players.splice(players.indexOf(removePlayer), 1);
    return this.broadcast.emit("remove player", {
      id: this.id
    });
  };

  newMessage = function(data) {
    return this.broadcast.emit("new message", {
      message: data.message,
      type: data.type
    });
  };

  onNewPlayer = function(data) {
    var newPlayer, player, _i, _len;
    newPlayer = new Player(data.x, data.y, this.id);
    this.broadcast.emit("new player", {
      id: newPlayer.id,
      x: newPlayer.x,
      y: newPlayer.y
    });
    for (_i = 0, _len = players.length; _i < _len; _i++) {
      player = players[_i];
      this.emit("new player", {
        id: player.id,
        x: player.x,
        y: player.y
      });
    }
    return players.push(newPlayer);
  };

  onMovePlayer = function(data) {
    return this.broadcast.emit("move player", {
      id: this.id,
      x: data.x,
      y: data.y
    });
  };

  playerById = function(id) {
    var player, result;
    result = false;
    if ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = players.length; _i < _len; _i++) {
        player = players[_i];
        _results.push(player.id === id);
      }
      return _results;
    })()) {
      result = player;
    }
    return result;
  };

  socket.sockets.on('connection', onSocketConnection);

}).call(this);
