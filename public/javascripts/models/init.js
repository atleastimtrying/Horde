
  require(["javascripts/models/game.js", "javascripts/models/input.js", "javascripts/models/chat.js", "javascripts/views/canvas.js", "javascripts/models/player.js", "javascripts/models/localplayer.js"], function() {
    return $(function() {
      return window.game = new window.Game();
    });
  });
