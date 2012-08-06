
  require(["javascripts/models/game.js", "javascripts/models/input.js", "javascripts/models/chat.js"], function() {
    return $(function() {
      return window.game = new window.Game();
    });
  });
