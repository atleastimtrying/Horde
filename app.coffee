express = require('express')
routes = require('./routes')
app = module.exports = express.createServer()
connections = []

app.configure = ->
  # app.set 'views', __dirname + '/views'
  # app.set 'view engine', 'jade'
  app.use express['static'] __dirname + '/views'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser()
  app.use app.router
  app.use express.static __dirname + '/public'

app.configure 'development', ->
  app.use express.errorHandler { 
    dumpExceptions: true
    showStack: true
  }

app.configure 'production', ->
  app.use express.errorHandler() 

# app.get '/', routes.index

app.listen 8080
#console.log "Express server listening on port #{app.address().port}"

#sockets stuff

io = require 'socket.io'

socket = io.listen app
socket.set "log level", 2

players = []
games = []

class Player
  constructor: (@x, @y, @rotation, @id)->

class Game
  constructor: (@players, @ownerId, @name, @timeOut, @scoreOut, @privacy)->
    @enemies = []
    @bullets = []
    @map = ''
  
  join:(player)->
    if @privacy isnt 'private'
      if @hasPlayer player.id
        console.log 'yo'
  
  hasPlayer: (id)->
    isPlayer = false
    isPlayer = true is id = player.id for player in @players
    isPlayer

onSocketConnection = (client)->
  #console.log "new player connected #{client.id}"
  client.on 'disconnect', onClientDisconnect
  client.on 'new message', newMessage
  client.on 'new player', onNewPlayer
  client.on 'move player', onMovePlayer
  
  client.on 'read player', players.read
  client.on 'update player', players.update
  client.on 'create player', players.create
  client.on 'delete player', players.delete

  client.on 'read game', games.read
  client.on 'read games', games.readAll
  client.on 'update game', games.update
  client.on 'delete game', games.delete

onReadPlayer = (id)->
  this.broadcast.emit "showing player", playerById @id



onClientDisconnect = ()->
  console.log "player disconnected #{@id}"
  removePlayer = playerById @id
  players.splice players.indexOf(removePlayer), 1
  this.broadcast.emit "remove player", {id: @id}

newMessage = (data)->
  @broadcast.emit "new message",
    message: data.message
    type: data.type 

onNewPlayer = (data)->
  newPlayer = new Player data.x, data.y, data.rotation, this.id
  this.broadcast.emit "new player", 
    id: newPlayer.id
    x: newPlayer.x
    y: newPlayer.y
    rotation: newPlayer.rotation
  this.emit "new player", {id: player.id, x: player.x, y: player.y, rotation: player.rotation} for player in players
  players.push newPlayer

onMovePlayer = (data)->
  this.broadcast.emit "move player", 
    id: @id
    x: data.x
    y: data.y
    rotation: data.rotation

playerById = (id)->
  result = false
  result = player if player.id is id for player in players
  result

socket.sockets.on 'connection', onSocketConnection
