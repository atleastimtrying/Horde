class window.Game extends Backbone.Model
  initialize: ->
    @context = $('canvas')[0].getContext '2d'
    @input = new Input
    @chat = new Chat
    @canvasView = new CanvasView
    @socket = io.connect 'http://localhost'
    @bindSockets()
  bindSockets:->
    @socket.on 'connect', @connect
    @socket.on 'disconnect', @disconnect
    @socket.on 'new player', @newPlayer
    @socket.on 'move player', @movePlayer
    @socket.on 'remove player', @removePlayer
  
  draw: =>
    @context.fillStyle = "gray"

  connect: (data)->
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