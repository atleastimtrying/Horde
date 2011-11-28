
  require(["javascripts/models/game.js", "javascripts/models/bullet.js", "javascripts/models/enemy.js", "javascripts/models/input.js", "javascripts/models/player.js", "javascripts/models/sockets.js", "javascripts/models/twittermanager.js", "javascripts/collections/bullets.js", "javascripts/collections/enemies.js", "javascripts/collections/players.js"], function($) {
    return $(function() {
      return window.game = new window.Game();
    });
  });
