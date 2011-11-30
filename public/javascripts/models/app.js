(function() {
  Array.prototype.remove = function(e) {
    var t, _ref;
    if ((t = this.indexOf(e)) > -1) {
      return ([].splice.apply(this, [t, t - t + 1].concat(_ref = [])), _ref);
    }
  };
  require(["javascripts/models/game.js", "javascripts/models/bullet.js", "javascripts/models/enemy.js", "javascripts/models/input.js", "javascripts/models/player.js", "javascripts/models/sockets.js", "javascripts/models/twittermanager.js"], function() {
    return $(function() {
      return window.game = new window.Game();
    });
  });
}).call(this);
