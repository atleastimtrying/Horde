(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Input = (function() {
    function Input(app) {
      this.app = app;
      this.clicked = __bind(this.clicked, this);
      this.moved = __bind(this.moved, this);
      this.keyPressUp = __bind(this.keyPressUp, this);
      this.keyPressDown = __bind(this.keyPressDown, this);
      $(window).bind('keydown', this.keyPressDown);
      $(window).bind('keyup', this.keyPressUp);
      $('canvas').mousemove(this.moved);
      $('canvas').click(this.clicked);
    }
    Input.prototype.keyPressDown = function(event) {
      var message;
      if (event.keyCode === 87) {
        message = 'up';
      }
      if (event.keyCode === 83) {
        message = 'down';
      }
      if (event.keyCode === 65) {
        message = 'left';
      }
      if (event.keyCode === 68) {
        message = 'right';
      }
      if (event.keyCode === 66) {
        message = 'bomb';
      }
      if (event.keyCode === 32) {
        message = 'pause';
      }
      return $(this.app).trigger('key', message);
    };
    Input.prototype.keyPressUp = function() {
      return $(this.app).trigger('keyup');
    };
    Input.prototype.moved = function(event) {
      return $(this.app).trigger('moved', {
        x: event.offsetX,
        y: event.offsetY
      });
    };
    Input.prototype.clicked = function(event) {
      var message;
      if (event.which === 1) {
        message = 'leftclick';
      }
      if (event.which === 3) {
        message = 'rightclick';
      }
      return $(this.app).trigger('click', message);
    };
    return Input;
  })();
}).call(this);
