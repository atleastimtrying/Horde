(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Input = (function() {
    function Input(app) {
      this.app = app;
      this.clicked = __bind(this.clicked, this);
      this.keyPressUp = __bind(this.keyPressUp, this);
      this.keyPressDown = __bind(this.keyPressDown, this);
      $(window).bind('keydown', this.keyPressDown);
      $(window).bind('keyup', this.keyPressUp);
      $('canvas').mousedown(this.clicked);
      this.keyDown = false;
    }
    Input.prototype.keyPressDown = function(event) {
      this.keyDown = true;
      if (event.keyCode === 87) {
        this.app.players[0].instructions = [0, -1];
      }
      if (event.keyCode === 83) {
        this.app.players[0].instructions = [0, 1];
      }
      if (event.keyCode === 65) {
        this.app.players[0].instructions = [-1, 0];
      }
      if (event.keyCode === 68) {
        return this.app.players[0].instructions = [1, 0];
      }
    };
    Input.prototype.keyPressUp = function() {
      this.keyDown = false;
      return this.app.players[0].instructions = [0, 0];
    };
    Input.prototype.clicked = function(event) {
      if (event.which === 1) {
        this.app.players[0].shoot();
      }
      if (event.which === 3) {
        return this.app.players[0].melee();
      }
    };
    return Input;
  })();
}).call(this);
