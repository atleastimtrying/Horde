(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Bullet = (function() {

    function Bullet(owner) {
      this.owner = owner;
      this.hitTest = __bind(this.hitTest, this);
      this.draw = __bind(this.draw, this);
      this.app = this.owner.app;
      this.p5 = this.owner.p5;
      this.x = this.owner.x;
      this.y = this.owner.y;
      this.angle = this.owner.angle;
      this.speed = 3;
      this.xspeed = this.speed * this.p5.sin(this.p5.radians(this.angle + 180));
      this.yspeed = this.speed * this.p5.cos(this.p5.radians(this.angle + 180));
    }

    Bullet.prototype.draw = function() {
      this.p5.fill(0);
      this.p5.ellipse(this.x, this.y, 2, 2);
      this.x -= this.xspeed;
      this.y += this.yspeed;
      return this.hitTest();
    };

    Bullet.prototype.hitTest = function() {
      var enemy, _i, _len, _ref, _results;
      var _this = this;
      if (this.offEdge()) this.die();
      if (this.owner.player) {
        _ref = this.app.enemies;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          enemy = _ref[_i];
          _results.push((function(enemy) {
            if (enemy && _this.app.intersect(_this, enemy)) {
              enemy.hit();
              return _this.die();
            }
          })(enemy));
        }
        return _results;
      } else {
        if (this.app.intersect(this, this.app.localPlayer)) {
          this.app.localPlayer.hit();
          return this.die();
        }
      }
    };

    Bullet.prototype.offEdge = function() {
      return this.x > this.p5.width || this.x < 0 || this.y > this.p5.height || this.y < 0;
    };

    Bullet.prototype.die = function() {
      return this.app.bullets.splice(this.app.bullets.indexOf(this), 1);
    };

    return Bullet;

  })();

}).call(this);
