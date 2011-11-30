(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Player = (function() {

    function Player(p5, app) {
      this.p5 = p5;
      this.app = app;
      this.step = __bind(this.step, this);
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
    }

    Player.prototype.draw = function() {
      this.angle = this.p5.degrees(90 + this.p5.atan2(this.p5.mouseY - this.y, this.p5.mouseX - this.x));
      this.p5.translate(this.x, this.y);
      this.p5.rotate(this.p5.radians(this.angle));
      this.drawMan();
      this.p5.rotate(this.p5.radians(-this.angle));
      this.p5.translate(-this.x, -this.y);
      return this.rotation %= 360;
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
      return this.health = 10;
    };

    Player.prototype.shoot = function() {
      if (this.ammo > 0) {
        this.app.bullets.push(new Bullet(this, this.p5));
        return ammo -= 1;
      }
    };

    Player.prototype.step = function(instructions) {
      var forwardspeed, sidespeed;
      forwardspeed = instructions[1] * this.acceleration;
      this.x -= forwardspeed * this.p5.sin(this.p5.radians(this.angle));
      this.y += forwardspeed * this.p5.cos(this.p5.radians(this.angle));
      sidespeed = instructions[0] * this.acceleration;
      this.x -= sidespeed * this.p5.sin(this.p5.radians(this.angle - 90));
      return this.y += sidespeed * this.p5.cos(this.p5.radians(this.angle - 90));
    };

    return Player;

  })();

}).call(this);
