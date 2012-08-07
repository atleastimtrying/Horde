(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Bomb = (function() {
    function Bomb(owner) {
      this.owner = owner;
      this.timerCountdown = __bind(this.timerCountdown, this);
      this.draw = __bind(this.draw, this);
      this.app = this.owner.app;
      this.p5 = this.owner.p5;
      this.x = this.owner.x;
      this.y = this.owner.y;
      this.displayInteger = 3;
      this.timer = this.displayInteger * 60;
      this.isExploding = false;
      console.log(this);
    }
    Bomb.prototype.draw = function() {
      this.p5.fill(30);
      this.p5.translate(this.x, this.y);
      this.p5.ellipse(0, 0, 5, 5);
      this.p5.text(this.displayInteger, -10, -10);
      this.p5.translate(-this.x, -this.y);
      this.timerCountdown();
      if (this.isExploding) {
        return this.exploding;
      }
    };
    Bomb.prototype.timerCountdown = function() {
      if (this.timer === 120 || this.timer === 60) {
        this.displayInteger -= 1;
      }
      if (this.timer <= 0 && this.isExploding === false) {
        return this.explode();
      } else {
        return this.timer -= 1;
      }
    };
    Bomb.prototype.explode = function() {
      var enemy;
      this.isExploding = true;
      this.blastTimer = 50;
      if ((function() {
        var _i, _len, _ref, _results;
        _ref = this.app.enemies;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          enemy = _ref[_i];
          _results.push(enemy);
        }
        return _results;
      }).call(this)) {
        return this.killtest(enemy);
      }
    };
    Bomb.prototype.killtest = function(enemy) {
      if (enemy && this.p5.dist(this.x, this.y, enemy.x, enemy.y) < 100) {
        return enemy.die();
      }
    };
    Bomb.prototype.die = function() {
      return this.app.bombs.splice(this.app.bombs.indexOf(this), 1);
    };
    Bomb.prototype.exploding = function() {
      this.p5.fill(200, 100, 0);
      if (this.blastTimer > 25) {
        this.p5.ellipse(x, y, 4 * 25 - this.blastTimer, 4 * 25 - this.blastTimer);
      } else {
        this.p5.ellipse(this.x, this.y, 4 * this.blastTimer, 4 * this.blastTimer);
      }
      this.blastTimer -= 1;
      if (blastTimer < 0) {
        return this.die();
      }
    };
    return Bomb;
  })();
}).call(this);
