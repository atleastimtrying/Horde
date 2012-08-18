(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.Players = (function() {
    __extends(Players, Backbone.Collection);
    function Players() {
      Players.__super__.constructor.apply(this, arguments);
    }
    Players.prototype.model = Player;
    Players.prototype.initialize = function(app) {
      this.app = app;
      return console.log('players initialized');
    };
    return Players;
  })();
}).call(this);
