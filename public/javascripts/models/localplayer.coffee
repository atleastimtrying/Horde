class window.LocalPlayer extends Backbone.Model
  initialize: (@app)->
    @x = Math.random() * 600
    @y = Math.random() * 400
    @angle = Math.random() * 360
    @acceleration = 2
    @rotationSpeed = 1
    @health = 10
    @ammo = 20
    @player = true
    @rotationModifier = 90 #because sometimes CS makes me sad
    @instructions = [0, 0]
    @bindings()
    #@game.players.add @
  bindings:()->
    $(@app).bind 'leftclick', @leftclick
    $(@app).bind 'rightclick', @rightclick
    $(@app).bind 'up' , @up
    $(@app).bind 'down' , @down
    $(@app).bind 'left' , @left
    $(@app).bind 'right' , @right
    $(@app).bind 'bomb' , @bomb
    $(@app).bind 'pause' , @pause
  up: -> 
    @y -= 1
    @draw()
    @transmit()
  down: -> @y += 1
  left: -> @x -= 1
  right: -> @x += 1

  draw: ->

  transmit: ->