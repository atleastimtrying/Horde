(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Input = (function() {

    function Input(app) {
      this.app = app;
      this.keyPressSet = __bind(this.keyPressSet, this);
      $(window).keypress(this.keyPressSet);
      this.instructions = [0, 0];
    }

    Input.prototype.keyPressSet = function(event) {
      if (event.charCode === 119) {
        this.instructions = [0, -1];
      } else if (event.charCode === 115) {
        this.instructions = [0, 1];
      } else if (event.charCode === 97) {
        this.instructions = [-1, 0];
      } else if (event.charCode === 100) {
        this.instructions = [1, 0];
      } else {
        this.instructions = [0, 0];
      }
      return this.app.players[0].step(this.instructions);
    };

    return Input;

  })();

}).call(this);
