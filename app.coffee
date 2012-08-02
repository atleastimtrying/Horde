express = require('express')
routes = require('./routes')
app = module.exports = express.createServer()
connections = []

app.configure = ->
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser()
  app.use express.session { secret: 'your secret here' }
  app.use app.router
  app.use express.static __dirname + '/public'

app.configure 'development', ->
  app.use express.errorHandler { 
    dumpExceptions: true
    showStack: true
  }

app.configure 'production', ->
  app.use express.errorHandler() 

app.get '/', routes.index

app.listen 8080
console.log "Express server listening on port #{app.address().port}"

#sockets stuff

io = require 'socket.io'
Player = (require './Player').Player
socket = io.listen app
socket.set "log level", 2

players = []

onSocketConnection = (client)->
  console.log "new player connected #{client.id}"
  client.on 'disconnect', onClientDisconnect
  client.on 'new player', onNewPlayer
  client.on 'move player', onMovePlayer

onClientDisconnect = ()->
  console.log "player disconnected #{@id}"

onNewPlayer = (data)->
  newPlayer = new Player data.x, data.y, this.id
  this.broadcast.emit "new player", 
    id: newPlayer.id
    x: newPlayer.x
    y: newPlayer.y
  this.emit "new player", {id: player.id, x: player.x, y: player.y} for player in players
  players.push newPlayer

onMovePlayer = (data)->

socket.sockets.on 'connection', onSocketConnection
