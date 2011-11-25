(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Input = (function() {

    __extends(Input, Backbone.Model);

    function Input() {
      this.keyPressSet = __bind(this.keyPressSet, this);
      Input.__super__.constructor.apply(this, arguments);
    }

    Input.prototype.initialize = function() {
      $(window).keypress(this.keyPressSet);
      return this.set({
        instructions: [0, 0]
      });
    };

    Input.prototype.keyPressSet = function(event) {
      console.log(event.charCode);
      if (event.charCode === 119) {
        return this.set({
          instructions: [0, -1]
        });
      } else if (event.charCode === 115) {
        return this.set({
          instructions: [0, 1]
        });
      } else if (event.charCode === 97) {
        return this.set({
          instructions: [-1, 0]
        });
      } else if (event.charCode === 100) {
        return this.set({
          instructions: [1, 0]
        });
      } else {
        return this.set({
          instructions: [0, 0]
        });
      }
    };

    return Input;

  })();

}).call(this);
