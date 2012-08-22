require [
  "javascripts/models/game.js"
  # "javascripts/models/bullet.js"
  # "javascripts/models/bomb.js"
  # "javascripts/models/crate.js"
  # "javascripts/models/enemy.js"
  "javascripts/models/input.js"
  "javascripts/models/chat.js"
  "javascripts/views/canvas.js"
  "javascripts/models/player.js"
  "javascripts/models/localplayer.js"
  # "javascripts/models/players.js"
  # "javascripts/models/sockets.js"
  # "javascripts/models/twitter.js"
  ], ->
    $ ->
      window.game = new window.Game()