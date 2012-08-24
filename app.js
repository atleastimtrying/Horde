(function() {
  var App, Chat, DB, Game, Games, Player, Server, Sockets, User, Users, app;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Server = (function() {

    function Server(app) {
      this.app = app;
      this.express = require('express');
      this.server = module.exports = this.express.createServer();
      this.server.use(this.express.static(__dirname + '/public'));
      this.server.listen(8080);
    }

    return Server;

  })();

  DB = (function() {

    function DB(app) {
      var collections;
      this.app = app;
      this.mongojs = require('mongojs');
      collections = ["users", "reports"];
      this.db = this.mongojs.connect('testdb', ['users', 'games']);
      this.db.users.save({
        name: 'john'
      }, this.logresults);
    }

    DB.prototype.logresults = function(err, saved) {
      if (err || !saved) {
        return console.log("User not saved");
      } else {
        return console.log("User saved");
      }
    };

    return DB;

  })();

  Chat = (function() {

    function Chat(app) {
      this.app = app;
      this.app.sockets.sockets.on('new message', this.newMessage);
    }

    Chat.prototype.newMessage = function(data) {
      return this.broadcast.emit("new message", {
        message: data.message,
        type: data.type
      });
    };

    return Chat;

  })();

  Sockets = (function() {

    function Sockets(app) {
      this.app = app;
      this.connections = __bind(this.connections, this);
      this.io = require('socket.io');
      this.socket = this.io.listen(this.app.server.server);
      this.socket.set("log level", 2);
      this.connections = [];
      this.socket.sockets.on('connection', this.connections);
    }

    Sockets.prototype.connections = function(client) {
      console.log("new user connected " + client.id);
      client.on('disconnect', this.sockets.onClientDisconnect);
      client.on('read user', this.users.read);
      client.on('read users', this.users.readAll);
      client.on('update user', this.users.update);
      client.on('create user', this.users.create);
      client.on('delete user', this.users["delete"]);
      client.on('read game', this.games.read);
      client.on('read games', this.games.readAll);
      client.on('create game', this.games.create);
      client.on('update game', this.games.update);
      return client.on('delete game', this.games["delete"]);
    };

    return Sockets;

  })();

  App = (function() {

    function App() {
      this.removeById = __bind(this.removeById, this);      this.db = new DB(this);
      this.server = new Server(this);
      this.chat = new Chat(this);
      this.users = new Users(this);
      this.games = new Games(this);
      this.sockets = new Sockets(this);
    }

    App.prototype.byId = function(collection, item) {
      var item, result;
      result = false;
      if ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = collection.length; _i < _len; _i++) {
          item = collection[_i];
          _results.push(item.id === id);
        }
        return _results;
      })()) {
        result = item;
      }
      return result;
    };

    App.prototype.removeById = function(collection, item) {
      var removeItem;
      removeItem = this.byId(collection, id);
      return collection.splice(collection.indexOf(removeItem), 1);
    };

    return App;

  })();

  User = (function() {

    function User() {}

    return User;

  })();

  Users = (function() {

    function Users(app) {
      this.app = app;
      this.collection = [];
    }

    Users.prototype.read = function(id) {
      return this.app.byId(this.collection, id);
    };

    Users.prototype.readAll = function() {
      return this.collection;
    };

    Users.prototype.create = function() {
      var user;
      user = new User();
      return this.collection.push(user);
    };

    Users.prototype.update = function(id) {};

    Users.prototype["delete"] = function(id) {
      return this.app.removeById(this.collection, id);
    };

    return Users;

  })();

  Games = (function() {

    function Games(app) {
      this.app = app;
      this.collection = [];
    }

    Games.prototype.read = function(id) {
      return this.app.byId(this.collection, id);
    };

    Games.prototype.readAll = function() {
      return this.collection;
    };

    Games.prototype.create = function() {
      var game;
      game = new Game();
      return this.collection.push(game);
    };

    Games.prototype.update = function(id) {};

    Games.prototype["delete"] = function(id) {
      return this.app.removeById(this.collection, id);
    };

    return Games;

  })();

  Player = (function() {

    function Player(x, y, rotation, id) {
      this.x = x;
      this.y = y;
      this.rotation = rotation;
      this.id = id;
    }

    return Player;

  })();

  Game = (function() {

    function Game(players, ownerId, name, timeOut, scoreOut, privacy) {
      this.players = players;
      this.ownerId = ownerId;
      this.name = name;
      this.timeOut = timeOut;
      this.scoreOut = scoreOut;
      this.privacy = privacy;
      this.enemies = [];
      this.bullets = [];
      this.map = '';
      client.on('new player', this.onNewPlayer);
      client.on('move player', this.onMovePlayer);
    }

    Game.prototype.onPlayerDisconnect = function() {
      var removePlayer;
      console.log("player disconnected " + this.id);
      removePlayer = playerById(this.id);
      players.splice(players.indexOf(removePlayer), 1);
      return this.broadcast.emit("remove player", {
        id: this.id
      });
    };

    Game.prototype.onNewPlayer = function(data) {
      var newPlayer, player, _i, _len;
      newPlayer = new Player(data.x, data.y, data.rotation, this.id);
      this.broadcast.emit("new player", {
        id: newPlayer.id,
        x: newPlayer.x,
        y: newPlayer.y,
        rotation: newPlayer.rotation
      });
      for (_i = 0, _len = players.length; _i < _len; _i++) {
        player = players[_i];
        this.emit("new player", {
          id: player.id,
          x: player.x,
          y: player.y,
          rotation: player.rotation
        });
      }
      return players.push(newPlayer);
    };

    Game.prototype.onMovePlayer = function(data) {
      return this.broadcast.emit("move player", {
        id: this.id,
        x: data.x,
        y: data.y,
        rotation: data.rotation
      });
    };

    Game.prototype.join = function(player) {
      if (this.privacy !== 'private') {
        if (this.hasPlayer(player.id)) return console.log('yo');
      }
    };

    Game.prototype.hasPlayer = function(id) {
      var isPlayer, player, _i, _len, _ref;
      isPlayer = false;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        isPlayer = true === (id = player.id);
      }
      return isPlayer;
    };

    Game.prototype.playerById = function(id) {
      var player, result;
      result = false;
      if ((function() {
        var _i, _len, _ref, _results;
        _ref = this.players;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          player = _ref[_i];
          _results.push(player.id === id);
        }
        return _results;
      }).call(this)) {
        result = player;
      }
      return result;
    };

    return Game;

  })();

  app = new App;

}).call(this);
