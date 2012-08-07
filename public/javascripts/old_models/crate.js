(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Crate = (function() {
    function Crate(x, y, ammo, app) {
      this.x = x;
      this.y = y;
      this.ammo = ammo;
      this.app = app;
      this.draw = __bind(this.draw, this);
      this.p5 = this.app.p5;
    }
    Crate.prototype.draw = function() {
      if (this.ammo) {
        this.p5.fill(0, 150, 0);
      } else {
        this.p5.fill(150, 0, 0);
      }
      this.p5.translate(this.x, this.y);
      this.p5.rect(-20, -20, 40, 40);
      this.p5.translate(-this.x, -this.y);
      return this.hitTest();
    };
    Crate.prototype.hitTest = function() {
      if (this.app.intersect(this, this.app.localPlayer)) {
        if (this.ammo) {
          this.app.localPlayer.ammo += 5;
        } else {
          this.app.localPlayer.health += 5;
        }
        return this.die();
      }
    };
    Crate.prototype.die = function() {
      return this.app.crates.splice(this.app.crates.indexOf(this), 1);
    };
    return Crate;
  })();
}).call(this);
