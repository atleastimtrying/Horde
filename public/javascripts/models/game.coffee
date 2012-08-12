class window.Game extends Backbone.Model
  initialize: ->
    @remotePlayers = []
    @input = new Input @
    @canvasView = new CanvasView @
    @socket = io.connect 'http://192.168.0.10'
    @bindSockets()
    @chat = new Chat
  bindSockets:->
    @socket.on 'connect', @connect
    @socket.on 'disconnect', @disconnect
    @socket.on 'new player', @newPlayer
    @socket.on 'move player', @movePlayer
    @socket.on 'remove player', @removePlayer

  connect: (data)=>
    @localPlayer = new LocalPlayer @
    @socket.emit "new player", 
      x: @localPlayer.x
      y: @localPlayer.y

  disconnect: (data)->
    console.log 'disconnected from server'

  newPlayer: (data)=>
    console.log "new player joined : #{data.id}"
    newPlayer = new Player @, data
    @remotePlayers.push newPlayer

  movePlayer: (data)=>
    movePlayer = @playerById data.id
    movePlayer.x = data.x
    movePlayer.y = data.y

  removePlayer: (data)=>
    console.log "player left : #{data.id}"
    removePlayer = @playerById data.id
    removePlayer.remove()
  
  playerById: (id)=>
    result = false
    result = player if player.id is id for player in @remotePlayers
    result