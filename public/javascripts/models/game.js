(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Game = (function() {

    __extends(Game, Backbone.Model);

    function Game() {
      this.playerById = __bind(this.playerById, this);
      this.removePlayer = __bind(this.removePlayer, this);
      this.movePlayer = __bind(this.movePlayer, this);
      this.newPlayer = __bind(this.newPlayer, this);
      this.connect = __bind(this.connect, this);
      Game.__super__.constructor.apply(this, arguments);
    }

    Game.prototype.initialize = function() {
      this.remotePlayers = [];
      this.input = new Input(this);
      this.canvasView = new CanvasView(this);
      this.historyManager = new HistoryManager(this);
      this.socket = io.connect('http://' + window.location.hostname);
      this.bindSockets();
      return this.chat = new Chat;
    };

    Game.prototype.bindSockets = function() {
      this.socket.on('connect', this.connect);
      this.socket.on('disconnect', this.disconnect);
      this.socket.on('new player', this.newPlayer);
      this.socket.on('move player', this.movePlayer);
      return this.socket.on('remove player', this.removePlayer);
    };

    Game.prototype.connect = function(data) {
      this.localPlayer = new LocalPlayer(this);
      return this.socket.emit("new player", {
        x: this.localPlayer.x,
        y: this.localPlayer.y,
        rotation: this.localPlayer.rotation
      });
    };

    Game.prototype.disconnect = function(data) {
      return console.log('disconnected from server');
    };

    Game.prototype.newPlayer = function(data) {
      var newPlayer;
      console.log("new player joined : " + data.id);
      newPlayer = new Player(this, data);
      return this.remotePlayers.push(newPlayer);
    };

    Game.prototype.movePlayer = function(data) {
      var movePlayer;
      movePlayer = this.playerById(data.id);
      movePlayer.x = data.x;
      movePlayer.y = data.y;
      return movePlayer.rotation = data.rotation;
    };

    Game.prototype.removePlayer = function(data) {
      var removePlayer;
      console.log("player left : " + data.id);
      removePlayer = this.playerById(data.id);
      return removePlayer.remove();
    };

    Game.prototype.playerById = function(id) {
      var player, result;
      result = false;
      if ((function() {
        var _i, _len, _ref, _results;
        _ref = this.remotePlayers;
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

    Game.prototype.radians = function(degrees) {
      return degrees * (Math.PI / 180);
    };

    Game.prototype.degrees = function(radians) {
      return radians * (180 / Math.PI);
    };

    return Game;

  })();

}).call(this);
