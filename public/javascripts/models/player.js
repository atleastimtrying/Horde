// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Player = (function(_super) {

    __extends(Player, _super);

    function Player() {
      this.remove = __bind(this.remove, this);

      this.draw = __bind(this.draw, this);
      return Player.__super__.constructor.apply(this, arguments);
    }

    Player.prototype.initialize = function(app, data) {
      this.app = app;
      this.x = data.x;
      this.y = data.y;
      this.rotation = data.rotation;
      this.id = data.id;
      return $(this.app).bind('draw', this.draw);
    };

    Player.prototype.draw = function(message, context) {
      context.translate(this.x, this.y);
      context.rotate(this.app.degreesToRadians(this.rotation));
      context.fillStyle = 'gray';
      context.fillRect(-5, -5, 10, 10);
      context.rotate(0 - this.app.degreesToRadians(this.rotation));
      return context.translate(-this.x, -this.y);
    };

    Player.prototype.remove = function() {
      $(this.app).unbind('draw', this.draw);
      return this.app.remotePlayers.splice(this.app.remotePlayers.indexOf(this), 1);
    };

    return Player;

  })(Backbone.Model);

}).call(this);
