(function() {
  window.CanvasView = (function() {
    function CanvasView() {
      this.canvas = $('canvas');
      this.context = this.canvas[0].getContext('2d');
      this.canvas.css({
        width: "700px",
        height: '400px'
      });
      this.canvas[0].width = 700;
      this.canvas[0].height = 400;
      this.render();
    }
    CanvasView.prototype.render = function() {
      return this.context.fillRect(10, 10, 10, 10);
    };
    return CanvasView;
  })();
}).call(this);
