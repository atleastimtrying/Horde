(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Player = (function() {

    function Player(p5, app) {
      this.p5 = p5;
      this.app = app;
      this.melee = __bind(this.melee, this);
      this.shoot = __bind(this.shoot, this);
      this.die = __bind(this.die, this);
      this.hit = __bind(this.hit, this);
      this.draw = __bind(this.draw, this);
      this.x = this.p5.width / 2;
      this.y = this.p5.height / 2;
      this.angle = this.p5.random(360);
      this.acceleration = 2;
      this.rotationSpeed = 1;
      this.health = 10;
      this.ammo = 20;
      this.player = true;
      this.rotationModifier = 90;
      this.instructions = [0, 0];
    }

    Player.prototype.draw = function() {
      this.angle = this.p5.degrees(this.p5.atan2(this.p5.mouseY - this.y, this.p5.mouseX - this.x)) + this.rotationModifier;
      this.p5.translate(this.x, this.y);
      this.p5.rotate(this.p5.radians(this.angle));
      this.drawMan();
      this.p5.rotate(this.p5.radians(-this.angle));
      this.p5.translate(-this.x, -this.y);
      this.rotation %= 360;
      if (this.app.input.keyDown) return this.step();
    };

    Player.prototype.drawMan = function() {
      this.p5.fill(255);
      this.p5.rect(-20, -10, 40, 20);
      this.p5.fill(200, 100, 10);
      this.p5.ellipse(0, 0, 20, 20);
      this.p5.rect(-20, -15, 10, 5);
      return this.p5.rect(10, -15, 10, 5);
    };

    Player.prototype.hit = function() {
      if (this.health > 1) {
        return this.health -= 1;
      } else {
        return this.die();
      }
    };

    Player.prototype.die = function() {
      this.x = this.p5.width / 2;
      this.y = this.p5.height / 2;
      this.health = 10;
      return this.app.deaths += 1;
    };

    Player.prototype.shoot = function() {
      if (this.ammo > 0) {
        this.app.bullets.push(new Bullet(this, this.p5));
        return this.ammo -= 1;
      }
    };

    Player.prototype.melee = function() {
      var enemy, _i, _len, _ref, _results;
      var _this = this;
      _ref = this.app.enemies;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        enemy = _ref[_i];
        _results.push((function(enemy) {
          if (enemy.dead !== true && _this.app.intersect(_this, enemy)) {
            return enemy.hit();
          }
        })(enemy));
      }
      return _results;
    };

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
