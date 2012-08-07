(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Enemy = (function() {
    function Enemy(app) {
      this.app = app;
      this.shoot = __bind(this.shoot, this);
      this.die = __bind(this.die, this);
      this.hit = __bind(this.hit, this);
      this.draw = __bind(this.draw, this);
      this.p5 = this.app.p5;
      this.x = this.p5.width;
      this.y = this.p5.random(this.p5.height);
      this.angle = this.p5.random(360);
      this.acceleration = this.p5.random(1.5);
      this.rotationSpeed = 1;
      this.health = 5;
      this.ammo = 20;
      this.rotationModifier = 90;
      this.shotlimit = this.shottimer = 150 + this.p5.random(70);
      this.hittimer = 20;
      this.player = false;
    }
    Enemy.prototype.draw = function() {
      this.angle = this.p5.degrees(this.p5.atan2(this.app.localPlayer.y - this.y, this.app.localPlayer.x - this.x)) + this.rotationModifier;
      this.p5.translate(this.x, this.y);
      this.p5.rotate(this.p5.radians(this.angle));
      this.drawEnemy();
      this.p5.rotate(this.p5.radians(-this.angle));
      this.p5.translate(-this.x, -this.y);
      this.rotation %= 360;
      this.attack();
      return this.step();
    };
    Enemy.prototype.drawEnemy = function() {
      this.p5.fill(0);
      this.p5.rect(-20, -10, 40, 20);
      this.p5.fill(200, 100, 10);
      this.p5.ellipse(0, 0, 20, 20);
      this.p5.rect(-20, -15, 10, 5);
      return this.p5.rect(10, -15, 10, 5);
    };
    Enemy.prototype.step = function() {
      this.x += this.acceleration * this.p5.sin(this.p5.radians(this.angle));
      return this.y -= this.acceleration * this.p5.cos(this.p5.radians(this.angle));
    };
    Enemy.prototype.attack = function() {
      if (this.app.intersect(this, this.app.localPlayer)) {
        if (this.hittimer > 0) {
          return this.hittimer -= 1;
        } else {
          this.hittimer = 20;
          return this.app.localPlayer.hit();
        }
      } else {
        if (this.shottimer > 0) {
          return this.shottimer -= 1;
        } else {
          this.shottimer = this.shotlimit;
          return this.shoot();
        }
      }
    };
    Enemy.prototype.hit = function() {
      if (this.health > 1) {
        return this.health -= 1;
      } else {
        return this.die();
      }
    };
    Enemy.prototype.die = function() {
      this.makeCrate();
      this.app.killCount += 1;
      return this.app.enemies.splice(this.app.enemies.indexOf(this), 1);
    };
    Enemy.prototype.makeCrate = function() {
      var randy;
      randy = this.p5.random(10);
      if (randy > 8) {
        this.app.crates.push(new Crate(this.x, this.y, true, this.app));
      }
      if (randy < 2) {
        return this.app.crates.push(new Crate(this.x, this.y, false, this.app));
      }
    };
    Enemy.prototype.shoot = function() {
      if (this.ammo > 0) {
        this.app.bullets.push(new Bullet(this));
        return this.ammo -= 1;
      }
    };
    return Enemy;
  })();
}).call(this);
