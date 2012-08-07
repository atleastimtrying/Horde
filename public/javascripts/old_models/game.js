(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.Game = (function() {
    __extends(Game, Backbone.Model);
    function Game() {
      this.draw = __bind(this.draw, this);
      Game.__super__.constructor.apply(this, arguments);
    }
    Game.prototype.initialize = function() {
      return this.context = $('canvas')[0].getContext('2d');
    };
    Game.prototype.draw = function() {
      return this.context.fillStyle = "gray";
    };
    return Game;
  })();
}).call(this);
