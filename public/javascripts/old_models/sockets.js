(function() {
  window.Sockets = (function() {
    function Sockets(app) {
      this.app = app;
      this.socket = io.connect('http://localhost');
      this.socket.on('connect', this.connect);
      this.socket.on('disconnect', this.disconnect);
      this.socket.on('new player', this.newPlayer);
      this.socket.on('move player', this.movePlayer);
      this.socket.on('remove player', this.removePlayer);
    }
    Sockets.prototype.connect = function(data) {
      console.log('connected to server');
      console.log(this.app);
      this.app.localPlayer = new Player(this, 'wuh?');
      return this.socket.emit("new player", {
        x: this.app.localPlayer.x,
        y: this.app.localPlayer.y
      });
    };
    Sockets.prototype.disconnect = function(data) {
      return console.log('disconnected from server');
    };
    Sockets.prototype.newPlayer = function(data) {
      var newPlayer;
      console.log("new player joined : " + data.id);
      return newPlayer = new Player(this.app, data.id);
    };
    Sockets.prototype.movePlayer = function(data) {};
    Sockets.prototype.removePlayer = function(data) {};
    return Sockets;
  })();
}).call(this);
