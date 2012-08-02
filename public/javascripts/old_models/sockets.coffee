class window.Sockets
  constructor: (@app)->
    @socket = io.connect 'http://localhost'
    @socket.on 'connect', @connect
    @socket.on 'disconnect', @disconnect
    @socket.on 'new player', @newPlayer
    @socket.on 'move player', @movePlayer
    @socket.on 'remove player', @removePlayer

  connect: (data)->
    console.log 'connected to server'
    console.log @app
    @app.localPlayer = new Player @, 'wuh?'
    @socket.emit "new player", 
      x: @app.localPlayer.x
      y: @app.localPlayer.y

  disconnect: (data)->
    console.log 'disconnected from server'

  newPlayer: (data)->
    console.log "new player joined : #{data.id}"
    newPlayer = new Player @app, data.id

  movePlayer: (data)->

  removePlayer: (data)->
