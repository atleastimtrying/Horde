(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Player = (function() {

    __extends(Player, Backbone.Model);

    function Player() {
      this.remove = __bind(this.remove, this);
      this.draw = __bind(this.draw, this);
      Player.__super__.constructor.apply(this, arguments);
    }

    Player.prototype.initialize = function(app, data) {
      this.app = app;
      this.x = data.x;
      this.y = data.y;
      this.rotation = data.rotation;
      this.id = data.id;
      $(this.app).bind('draw', this.draw);
      this.img = new Image();
      return this.img.src = '/images/man.png';
    };

    Player.prototype.draw = function(message, context) {
      context.translate(this.x, this.y);
      context.rotate(this.app.radians(this.rotation));
      context.fillStyle = 'gray';
      context.drawImage(this.img, -5, -5);
      context.rotate(0 - this.app.radians(this.rotation));
      return context.translate(-this.x, -this.y);
    };

    Player.prototype.remove = function() {
      $(this.app).unbind('draw', this.draw);
      return this.app.remotePlayers.splice(this.app.remotePlayers.indexOf(this), 1);
    };

    return Player;

  })();

}).call(this);
