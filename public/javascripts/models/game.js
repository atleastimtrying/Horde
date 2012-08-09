(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Game = (function() {

    __extends(Game, Backbone.Model);

    function Game() {
      this.draw = __bind(this.draw, this);
      Game.__super__.constructor.apply(this, arguments);
    }

    Game.prototype.initialize = function() {
      this.input = new Input(this);
      this.chat = new Chat;
      this.canvasView = new CanvasView(this);
      this.socket = io.connect('http://192.168.0.10');
      this.bindSockets();
      return this.localPlayer = new LocalPlayer(this);
    };

    Game.prototype.bindSockets = function() {
      this.socket.on('connect', this.connect);
      this.socket.on('disconnect', this.disconnect);
      this.socket.on('new player', this.newPlayer);
      this.socket.on('move player', this.movePlayer);
      return this.socket.on('remove player', this.removePlayer);
    };

    Game.prototype.draw = function() {
      return this.context.fillStyle = "gray";
    };

    Game.prototype.connect = function(data) {};

    Game.prototype.disconnect = function(data) {
      return console.log('disconnected from server');
    };

    Game.prototype.newPlayer = function(data) {
      var newPlayer;
      console.log("new player joined : " + data.id);
      return newPlayer = new Player(this.app, data.id);
    };

    Game.prototype.movePlayer = function(data) {};

    Game.prototype.removePlayer = function(data) {};

    return Game;

  })();

}).call(this);
