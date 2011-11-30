(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Game = (function() {

    function Game() {
      this.intersect = __bind(this.intersect, this);
      this.draw = __bind(this.draw, this);
      this.sketch = __bind(this.sketch, this);      this.input = new window.Input(this);
      this.players = [];
      this.bullets = [];
      this.enemies = [];
      this.p5 = new Processing($('canvas')[0], this.sketch);
      this.populateGame();
    }

    Game.prototype.sketch = function(p5) {
      p5.setup = function() {
        p5.size($('canvas').width(), $('canvas').height());
        p5.background(0x666666);
        p5.noStroke();
        return p5.smooth();
      };
      return p5.draw = this.draw;
    };

    Game.prototype.populateGame = function() {
      var amount, _results;
      this.players.push(new Player(this.p5, this));
      _results = [];
      for (amount = 0; amount <= 5; amount++) {
        _results.push(this.enemies.push(new Enemy(this.p5, this)));
      }
      return _results;
    };

    Game.prototype.fillEnemies = function() {
      return this.enemies = [];
    };

    Game.prototype.draw = function() {
      var bullet, enemy, player, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3, _results;
      this.p5.background(150);
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        player.draw();
      }
      _ref2 = this.enemies;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        enemy = _ref2[_j];
        enemy.draw();
      }
      _ref3 = this.bullets;
      _results = [];
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        bullet = _ref3[_k];
        _results.push(bullet.draw());
      }
      return _results;
    };

    Game.prototype.intersect = function(obj1, obj2) {
      return this.p5.dist(obj1.x, obj1.y, obj2.x, obj2.y) < 40;
    };

    return Game;

  })();

}).call(this);
