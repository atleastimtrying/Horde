(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.LocalPlayer = (function() {
    __extends(LocalPlayer, Backbone.Model);
    function LocalPlayer() {
      this.draw = __bind(this.draw, this);
      this.keyUp = __bind(this.keyUp, this);
      this.key = __bind(this.key, this);
      this.moved = __bind(this.moved, this);
      this.click = __bind(this.click, this);
      LocalPlayer.__super__.constructor.apply(this, arguments);
    }
    LocalPlayer.prototype.initialize = function(app) {
      this.app = app;
      this.x = Math.round(Math.random() * 600);
      this.y = Math.round(Math.random() * 400);
      this.rotation = Math.round(Math.random() * 360);
      this.acceleration = 2;
      this.keyDown = false;
      this.mouseX = this.x;
      this.mouseY = this.y;
      this.bindings();
      this.rotationModifier = 90;
      return this.instructions = [0, 0];
    };
    LocalPlayer.prototype.bindings = function() {
      $(this.app).bind('moved', this.moved);
      $(this.app).bind('key', this.key);
      $(this.app).bind('keyup', this.keyUp);
      return $(this.app).bind('draw', this.draw);
    };
    LocalPlayer.prototype.click = function(event, data) {
      this.rotation += 10;
      return this.transmit();
    };
    LocalPlayer.prototype.moved = function(event, mouseLocation) {
      this.mouseX = mouseLocation.x;
      this.mouseY = mouseLocation.y;
      this.rotation = this.app.degrees(Math.atan2(mouseLocation.y - this.y, mouseLocation.x - this.x)) + 90;
      return this.rotation %= 360;
    };
    LocalPlayer.prototype.key = function(event, data) {
      this.keyDown = true;
      if (data === 'up') {
        this.instructions = [0, -1];
      }
      if (data === 'down') {
        this.instructions = [0, 1];
      }
      if (data === 'left') {
        this.instructions = [-1, 0];
      }
      if (data === 'right') {
        return this.instructions = [1, 0];
      }
    };
    LocalPlayer.prototype.step = function() {
      var forwardspeed, sidespeed;
      forwardspeed = this.instructions[1] * this.acceleration;
      this.x -= Math.round(forwardspeed * Math.sin(this.app.radians(this.rotation)));
      this.y += Math.round(forwardspeed * Math.cos(this.app.radians(this.rotation)));
      sidespeed = this.instructions[0] * this.acceleration;
      this.x -= Math.round(sidespeed * Math.sin(this.app.radians(this.rotation - this.rotationModifier)));
      this.y += Math.round(sidespeed * Math.cos(this.app.radians(this.rotation - this.rotationModifier)));
      return this.transmit();
    };
    LocalPlayer.prototype.keyUp = function(event) {
      return this.keyDown = false;
    };
    LocalPlayer.prototype.transmit = function() {
      return this.app.socket.emit("move player", {
        x: this.x,
        y: this.y,
        rotation: this.rotation
      });
    };
    LocalPlayer.prototype.paint = function(context) {
      context.fillStyle = '#ccc';
      context.fillEllipse(0, 0, 10);
      context.fillStyle = 'black';
      context.fillEllipse(3, -3, 3);
      context.fillEllipse(-3, -3, 3);
      context.fillStyle = 'white';
      context.fillEllipse(3, -4, 1);
      return context.fillEllipse(-3, -4, 1);
    };
    LocalPlayer.prototype.draw = function(message, context) {
      if (this.keyDown) {
        this.step();
      }
      context.fillStyle = 'rgba(100,100,255,0.3)';
      context.fillEllipse(this.mouseX, this.mouseY, 5);
      context.translate(this.x, this.y);
      context.rotate(this.app.radians(this.rotation));
      this.paint(context);
      context.rotate(0 - this.app.radians(this.rotation));
      return context.translate(-this.x, -this.y);
    };
    return LocalPlayer;
  })();
}).call(this);
