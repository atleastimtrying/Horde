(function() {
  var Enemies;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Enemies = (function() {

    __extends(Enemies, Backbone.Collection);

    function Enemies() {
      Enemies.__super__.constructor.apply(this, arguments);
    }

    Enemies.prototype.model = window.Enemy;

    return Enemies;

  })();

}).call(this);
