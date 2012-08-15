(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.LocalPlayer = (function() {

    __extends(LocalPlayer, Backbone.Model);

    function LocalPlayer() {
      this.draw = __bind(this.draw, this);
      this.key = __bind(this.key, this);
      this.click = __bind(this.click, this);
      LocalPlayer.__super__.constructor.apply(this, arguments);
    }

    LocalPlayer.prototype.initialize = function(app) {
      this.app = app;
      this.x = Math.random() * 600;
      this.y = Math.random() * 400;
      this.rotation = Math.random() * 360;
      return this.bindings();
    };

    LocalPlayer.prototype.bindings = function() {
      $(this.app).bind('click', this.click);
      $(this.app).bind('key', this.key);
      return $(this.app).bind('draw', this.draw);
    };

    LocalPlayer.prototype.click = function(event, data) {
      this.rotation += 10;
      return this.transmit();
    };

    LocalPlayer.prototype.key = function(event, data) {
      if (data === 'up') this.y -= 2;
      if (data === 'down') this.y += 2;
      if (data === 'left') this.x -= 2;
      if (data === 'right') this.x += 2;
      return this.transmit();
    };

    LocalPlayer.prototype.transmit = function() {
      return this.app.socket.emit("move player", {
        x: this.x,
        y: this.y,
        rotation: this.rotation
      });
    };

    LocalPlayer.prototype.draw = function(message, context) {
      context.translate(this.x, this.y);
      context.rotate(this.app.degreesToRadians(this.rotation));
      context.fillStyle = 'green';
      context.fillRect(-5, -5, 10, 10);
      context.rotate(0 - this.app.degreesToRadians(this.rotation));
      return context.translate(-this.x, -this.y);
    };

    return LocalPlayer;

  })();

}).call(this);
