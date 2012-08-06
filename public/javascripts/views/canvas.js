(function() {
  var CanvasView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  CanvasView = (function() {

    __extends(CanvasView, Backbone.View);

    function CanvasView() {
      CanvasView.__super__.constructor.apply(this, arguments);
    }

    CanvasView.prototype.el = $('canvas');

    CanvasView.prototype.initialize = function() {
      return this.context = this.canvas[0].getContext('2d');
    };

    _.bindAll(CanvasView);

    CanvasView.render();

    return CanvasView;

  })();

  ({
    render: function() {
      return this.context.fillRect(10, 10, 10, 10);
    }
  });

}).call(this);
