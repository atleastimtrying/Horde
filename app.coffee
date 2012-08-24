class Server
  constructor: (@app)->
    @express = require 'express'
    @server = module.exports = @express.createServer()
    @server.use @express.static __dirname + '/public'
    @server.listen 8080

class DB
  constructor:(@app)->
    @mongojs = require 'mongojs'
    collections = ["users", "reports"]
    @db = @mongojs.connect 'testdb', ['users', 'games']
    @db.users.save {name: 'john'}, @logresults
  logresults: (err, saved)->
    if err || !saved
      console.log "User not saved"
    else 
      console.log "User saved"

class Chat 
  constructor:(@app)->
    @app.sockets.sockets.on 'new message', @newMessage
  
  newMessage: (data)->
    @broadcast.emit "new message",
      message: data.message
      type: data.type 

class Sockets
  constructor: (@app)->
    @io = require 'socket.io'
    @socket = @io.listen @app.server.server
    @socket.set "log level", 2
    @connections = []
    @socket.sockets.on 'connection', @connections
  connections: (client)=>
    console.log "new user connected #{client.id}"
    client.on 'disconnect', @sockets.onClientDisconnect
    
    client.on 'read user', @users.read
    client.on 'read users', @users.readAll
    client.on 'update user', @users.update
    client.on 'create user', @users.create
    client.on 'delete user', @users.delete

    client.on 'read game', @games.read
    client.on 'read games', @games.readAll
    client.on 'create game', @games.create
    client.on 'update game', @games.update
    client.on 'delete game', @games.delete

class App 
  constructor:->
    @db = new DB @
    @server = new Server @
    @chat = new Chat @
    @users = new Users @
    @games = new Games @
    @sockets = new Sockets @
  
  byId:(collection, item)->
    result = false
    result = item if item.id is id for item in collection
    result
  
  removeById:(collection,item)=>
    removeItem = @byId collection, id
    collection.splice collection.indexOf(removeItem), 1

class User
  constructor: ->

class Users
  constructor: (@app)->
    @collection = []
  read: (id)-> @app.byId @collection, id
  readAll: -> @collection
  create: ->
    user = new User()
    @collection.push user
  update: (id)->

  delete: (id)-> @app.removeById @collection, id

class Games
  constructor: (@app)->
    @collection = []
  read: (id)-> @app.byId @collection, id
  readAll: -> @collection
  create: ->
    game = new Game()
    @collection.push game
  update: (id)->
  delete: (id)-> @app.removeById @collection, id

class Player
  constructor: (@x, @y, @rotation, @id)->

class Game
  constructor: (@players, @ownerId, @name, @timeOut, @scoreOut, @privacy)->
    @enemies = []
    @bullets = []
    @map = ''
    client.on 'new player', @onNewPlayer
    client.on 'move player', @onMovePlayer
  
  onPlayerDisconnect: ()->
    console.log "player disconnected #{@id}"
    removePlayer = playerById @id
    players.splice players.indexOf(removePlayer), 1
    this.broadcast.emit "remove player", {id: @id}

  onNewPlayer: (data)->
    newPlayer = new Player data.x, data.y, data.rotation, this.id
    this.broadcast.emit "new player", 
      id: newPlayer.id
      x: newPlayer.x
      y: newPlayer.y
      rotation: newPlayer.rotation
    this.emit "new player", {id: player.id, x: player.x, y: player.y, rotation: player.rotation} for player in players
    players.push newPlayer

  onMovePlayer: (data)->
    this.broadcast.emit "move player", 
      id: @id
      x: data.x
      y: data.y
      rotation: data.rotation
  
  join:(player)->
    if @privacy isnt 'private'
      if @hasPlayer player.id
        console.log 'yo'
  
  hasPlayer: (id)->
    isPlayer = false
    isPlayer = true is id = player.id for player in @players
    isPlayer

  playerById: (id)->
    result = false
    result = player if player.id is id for player in @players
    result


app = new App