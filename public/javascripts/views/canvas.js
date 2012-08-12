(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.CanvasView = (function() {

    function CanvasView(app) {
      this.app = app;
      this.draw = __bind(this.draw, this);
      this.canvas = $('canvas');
      this.context = this.canvas[0].getContext('2d');
      this.canvas.css({
        width: "700px",
        height: '400px'
      });
      this.canvas[0].width = 700;
      this.canvas[0].height = 400;
      this.draw();
    }

    CanvasView.prototype.draw = function() {
      this.context.clearRect(0, 0, 700, 400);
      $(this.app).trigger('draw', this.context);
      return window.setTimeout(this.draw, 200);
    };

    return CanvasView;

  })();

}).call(this);
