require [
  "javascripts/models/game.js"
  "javascripts/models/bullet.js"
  "javascripts/models/enemy.js"
  "javascripts/models/input.js"
  "javascripts/models/player.js"
  "javascripts/models/sockets.js"
  "javascripts/models/twittermanager.js"
  ], ->
    $ ->
      window.game = new window.Game()
