(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.CanvasView = (function() {

    function CanvasView(app) {
      this.app = app;
      this.drawPlayer = __bind(this.drawPlayer, this);
      this.canvas = $('canvas');
      this.context = this.canvas[0].getContext('2d');
      this.canvas.css({
        width: "700px",
        height: '400px'
      });
      this.canvas[0].width = 700;
      this.canvas[0].height = 400;
      this.render();
      $(this.app).bind('playerdrawn', this.drawPlayer);
    }

    CanvasView.prototype.render = function() {};

    CanvasView.prototype.drawPlayer = function(event, data) {
      this.context.clearRect(data.x - 2, data.y - 2, 14, 14);
      this.context.fillStyle = 'black';
      return this.context.fillRect(data.x, data.y, 10, 10);
    };

    return CanvasView;

  })();

}).call(this);
