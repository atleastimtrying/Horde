(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Enemy = (function() {
    function Enemy(p5, app) {
      this.p5 = p5;
      this.app = app;
      this.shoot = __bind(this.shoot, this);
      this.die = __bind(this.die, this);
      this.hit = __bind(this.hit, this);
      this.draw = __bind(this.draw, this);
      this.x = this.p5.width;
      this.y = this.p5.random(this.p5.height);
      this.angle = this.p5.random(360);
      this.acceleration = this.p5.random(1.5);
      this.rotationSpeed = 1;
      this.health = 5;
      this.ammo = 20;
      this.shotlimit = this.shottimer = 150 + this.p5.random(70);
      this.hittimer = 20;
      this.dead = false;
      this.player = false;
    }
    Enemy.prototype.draw = function() {
      this.angle = this.p5.degrees(90 + this.p5.atan2(this.app.players[0].y - this.y, this.app.players[0].x - this.x));
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
      if (this.app.intersect(this, this.app.players[0])) {
        if (this.hittimer > 0) {
          return this.hittimer -= 1;
        } else {
          this.hittimer = 20;
          return this.app.players[0].hit();
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
      this.dead = true;
      return this.app.killCount += 1;
    };
    Enemy.prototype.shoot = function() {
      if (this.ammo > 0) {
        this.app.bullets.push(new Bullet(this, this.p5));
        return this.ammo -= 1;
      }
    };
    return Enemy;
  })();
}).call(this);
