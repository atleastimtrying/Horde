class window.Game extends Backbone.Model
  initialize: ->
    @input = new Input @
    @chat = new Chat
    @canvasView = new CanvasView @
    @socket = io.connect 'http://192.168.0.10'
    @bindSockets()
    @localPlayer = new LocalPlayer @
  bindSockets:->
    @socket.on 'connect', @connect
    @socket.on 'disconnect', @disconnect
    @socket.on 'new player', @newPlayer
    @socket.on 'move player', @movePlayer
    @socket.on 'remove player', @removePlayer
  
  draw: =>
    @context.fillStyle = "gray"

  connect: (data)->
    # @socket.emit "new player", 
    #   x: @localPlayer.x
    #   y: @localPlayer.y

  disconnect: (data)->
    console.log 'disconnected from server'

  newPlayer: (data)->
    console.log "new player joined : #{data.id}"
    newPlayer = new Player @app, data.id

  movePlayer: (data)->
  removePlayer: (data)->