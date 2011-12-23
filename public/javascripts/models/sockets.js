(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Sockets = (function() {

    function Sockets(app) {
      this.app = app;
      this.emitTwitterID = __bind(this.emitTwitterID, this);
      this.socket = io.connect('http://localhost');
      this.socket.on('download', this.updatePos);
      this.socket.on('twitter login response', this.twitterLoginResponse);
    }

    Sockets.prototype.emitTwitterID = function() {
      return this.socket.emit('logged in', {
        twitter_id: this.app.user.attributes.id
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
