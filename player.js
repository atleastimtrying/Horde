(function() {
  var Player;

  Player = (function() {

    function Player(x, y, id) {
      this.x = x;
      this.y = y;
      this.id = id;
    }

    return Player;

  })();

  exports.Player = Player;

}).call(this);
