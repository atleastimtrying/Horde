class window.LocalPlayer extends Backbone.Model
  initialize: (@app)->
    @x = Math.random() * 600
    @y = Math.random() * 400
    @rotation = Math.random() * 360
    # @acceleration = 2
    # @rotationSpeed = 1
    # @health = 10
    # @ammo = 20
    # @player = true
    # @rotationModifier = 90
    @bindings()
  
  bindings:->
    $(@app).bind 'click', @click
    $(@app).bind 'key', @key
    $(@app).bind 'draw', @draw
  
  click: (event, data)=>
    @rotation += 10
    @transmit()
  
  key: (event, data)=>
    @y -= 2 if data is 'up'
    @y += 2 if data is 'down'
    @x -= 2 if data is 'left'
    @x += 2 if data is 'right'
    @transmit()
  
  transmit: ->
    @app.socket.emit "move player",
      x: @x
      y: @y
      rotation: @rotation
  
  draw:(message, context)=>
    context.translate @x, @y
    context.rotate @app.degreesToRadians @rotation
    context.fillStyle = 'green'
    context.fillRect -5, -5,10,10
    context.rotate 0 - @app.degreesToRadians @rotation
    context.translate -@x, -@y