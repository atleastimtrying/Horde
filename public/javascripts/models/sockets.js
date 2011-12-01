
  window.Sockets = (function() {

    function Sockets() {
      this.socket = io.connect('http://localhost');
      this.socket.on('download', this.updatePos);
      this.socket.on('twitter login response', this.twitterLoginResponse);
    }

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
