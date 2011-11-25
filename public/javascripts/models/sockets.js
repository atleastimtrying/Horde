(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Sockets = (function() {

    __extends(Sockets, Backbone.Model);

    function Sockets() {
      Sockets.__super__.constructor.apply(this, arguments);
    }

    Sockets.prototype.initialize = function() {
      this.socket = io.connect('http://localhost');
      this.socket.on('download', this.updatePos);
      return this.socket.on('twitter login response', this.twitterLoginResponse);
    };

    Sockets.prototype.emitTwitterID = function() {
      return this.socket.emit('logged in', {
        twitter_id: this.user.attributes.id
      });
    };

    Sockets.prototype.updatePos = function(data) {
      return console.log(data);
    };

    Sockets.prototype.twitterLoginResponse = function(data) {
      return console.log(data);
    };

    return Sockets;

  })();

}).call(this);
