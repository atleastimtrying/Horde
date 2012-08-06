(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Input = (function() {

    __extends(Input, Backbone.Model);

    function Input() {
      Input.__super__.constructor.apply(this, arguments);
    }

    Input.prototype.initialize = function() {
      return $(window).mousemove(this.move);
    };

    Input.prototype.move = function(event) {};

    return Input;

  })();

}).call(this);
