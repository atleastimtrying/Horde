(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Game = (function() {

    __extends(Game, Backbone.Model);

    function Game() {
      this.draw = __bind(this.draw, this);
      this.sketch = __bind(this.sketch, this);
      Game.__super__.constructor.apply(this, arguments);
    }

    Game.prototype.initialize = function() {
      this.set({
        input: new window.Input(),
        players: new window.Players()
      });
      return this.p5 = new Processing($('canvas')[0], this.sketch);
    };

    Game.prototype.sketch = function(p5) {
      p5.setup = function() {
        p5.size($('canvas').width(), $('canvas').height());
        p5.background(0x666666);
        p5.noStroke();
        return p5.smooth();
      };
      return p5.draw = this.draw;
    };

    Game.prototype.draw = function() {
      return this.p5.ellipse(this.p5.random(this.p5.width), this.p5.random(this.p5.height), 10, 10);
    };

    return Game;

  })();

}).call(this);
