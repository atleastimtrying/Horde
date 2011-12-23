(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Game = (function() {

    function Game() {
      this.pauseToggle = __bind(this.pauseToggle, this);
      this.intersect = __bind(this.intersect, this);
      this.draw = __bind(this.draw, this);
      this.sketch = __bind(this.sketch, this);      this.input = new Input(this);
      this.sockets = new Sockets(this);
      this.twittermanager = new TwitterManager(this);
      this.players = [];
      this.bullets = [];
      this.enemies = [];
      this.crates = [];
      this.bombs = [];
      this.p5 = new Processing($('canvas')[0], this.sketch);
      this.localPlayer = new Player(this);
      this.kills = 0;
      this.deaths = 0;
      this.paused = false;
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

    Game.prototype.fillEnemies = function() {
      return this.enemies = [];
    };

    Game.prototype.draw = function() {
      this.p5.background(150);
      this.drawtest(this.crates);
      this.drawtest(this.bullets);
      this.drawtest(this.players);
      this.drawtest(this.enemies);
      this.drawtest(this.bombs);
      this.localPlayer.draw();
      return this.displayStats();
    };

    Game.prototype.intersect = function(obj1, obj2) {
      return this.p5.dist(obj1.x, obj1.y, obj2.x, obj2.y) < 40;
    };

    Game.prototype.displayStats = function() {
      $('.kills').html("kills : " + this.kills);
      $('.deaths').html("deaths : " + this.deaths);
      $('.ammo').html("ammo : " + this.localPlayer.ammo);
      return $('.health').html("health : " + this.localPlayer.health);
    };

    Game.prototype.pauseToggle = function() {
      if (this.paused) {
        this.p5.loop();
        return this.paused = false;
      } else {
        this.p5.noLoop();
        return this.paused = true;
      }
    };

    Game.prototype.drawtest = function(array) {
      var obj, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        obj = array[_i];
        _results.push((function(obj) {
          if (obj) return obj.draw();
        })(obj));
      }
      return _results;
    };

    Game.prototype.addEnemies = function() {
      if (this.enemies.length < 5) return this.enemies.push(new Enemy(this));
    };

    return Game;

  })();

}).call(this);
