(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Player = (function() {

    __extends(Player, Backbone.Model);

    function Player() {
      this.shoot = __bind(this.shoot, this);
      this.draw = __bind(this.draw, this);
      Player.__super__.constructor.apply(this, arguments);
    }

    Player.prototype.initialize = function(game, id) {
      this.game = game;
      this.id = id;
      this.p5 = this.game.p5;
      this.x = Math.random() * 600;
      this.y = Math.random() * 400;
      this.angle = Math.random() * 360;
      this.acceleration = 2;
      this.rotationSpeed = 1;
      this.health = 10;
      this.ammo = 20;
      this.player = true;
      this.rotationModifier = 90;
      return this.instructions = [0, 0];
    };

    Player.prototype.draw = function() {
      this.angle = this.p5.degrees(this.p5.atan2(this.p5.mouseY - this.y, this.p5.mouseX - this.x)) + this.rotationModifier;
      this.p5.translate(this.x, this.y);
      this.p5.rotate(this.p5.radians(this.angle));
      this.drawMan();
      this.p5.rotate(this.p5.radians(-this.angle));
      this.p5.translate(-this.x, -this.y);
      this.rotation %= 360;
      if (this.game.input.keyDown) return this.step();
    };

    Player.prototype.drawMan = function() {
      this.p5.fill(255);
      this.p5.rect(-20, -10, 40, 20);
      this.p5.fill(200, 100, 10);
      this.p5.ellipse(0, 0, 20, 20);
      this.p5.rect(-20, -15, 10, 5);
      return this.p5.rect(10, -15, 10, 5);
    };

    Player.prototype.shoot = function() {};

    Player.prototype.step = function() {
      var forwardspeed, sidespeed;
      forwardspeed = this.instructions[1] * this.acceleration;
      this.x -= forwardspeed * this.p5.sin(this.p5.radians(this.angle));
      this.y += forwardspeed * this.p5.cos(this.p5.radians(this.angle));
      sidespeed = this.instructions[0] * this.acceleration;
      this.x -= sidespeed * this.p5.sin(this.p5.radians(this.angle - this.rotationModifier));
      return this.y += sidespeed * this.p5.cos(this.p5.radians(this.angle - this.rotationModifier));
    };

    return Player;

  })();

}).call(this);
