(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Crate = (function() {

    function Crate(x, y, ammo, app) {
      this.x = x;
      this.y = y;
      this.ammo = ammo;
      this.app = app;
      this.draw = __bind(this.draw, this);
      this.dead = false;
      this.p5 = this.app.p5;
    }

    Crate.prototype.draw = function() {
      if (this.dead !== true) {
        if (this.ammo) {
          this.p5.fill(0, 150, 0);
        } else {
          this.p5.fill(150, 0, 0);
        }
        this.p5.translate(this.x, this.y);
        this.p5.rect(-20, -20, 40, 40);
        this.p5.translate(-this.x, -this.y);
        return this.hitTest();
      }
    };

    Crate.prototype.hitTest = function() {
      var player, _i, _len, _ref, _results;
      var _this = this;
      _ref = this.app.players;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        _results.push((function(player) {
          if (_this.app.intersect(_this, player)) {
            if (_this.ammo) {
              player.ammo += 5;
            } else {
              player.health += 5;
            }
            return _this.dead = true;
          }
        })(player));
      }
      return _results;
    };

    return Crate;

  })();

}).call(this);
