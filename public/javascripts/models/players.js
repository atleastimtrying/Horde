// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Players = (function(_super) {

    __extends(Players, _super);

    function Players() {
      return Players.__super__.constructor.apply(this, arguments);
    }

    Players.prototype.model = Player;

    Players.prototype.initialize = function(app) {
      this.app = app;
      return console.log('players initialized');
    };

    return Players;

  })(Backbone.Collection);

}).call(this);
