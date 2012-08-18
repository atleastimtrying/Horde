class window.Game extends Backbone.Model
  initialize: ->
    @remotePlayers = []
    @input = new Input @
    @canvasView = new CanvasView @
    @twitter = new Twitter @
    @socket = io.connect 'http://' + window.location.hostname
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
      rotation: @localPlayer.rotation

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
    movePlayer.rotation = data.rotation

  removePlayer: (data)=>
    console.log "player left : #{data.id}"
    removePlayer = @playerById data.id
    removePlayer.remove()
  
  playerById: (id)=>
    result = false
    result = player if player.id is id for player in @remotePlayers
    result

  radians: (degrees)->
    degrees * (Math.PI/180)
  
  degrees: (radians)->
    radians * (180/Math.PI)