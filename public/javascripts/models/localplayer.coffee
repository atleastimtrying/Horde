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
    @rotationModifier = 90
    @bindings()
  
  bindings:->
    $(@app).bind 'click', @click
    $(@app).bind 'key', @key
    $(@app).bind 'draw', @draw
  
  click: (event, data)->
    
  key: (event, data)=>
    @y -= 2 if data is 'up'
    @y += 2 if data is 'down'
    @x -= 2 if data is 'left'
    @x += 2 if data is 'right'

    @app.socket.emit "move player",
      x: @x
      y: @y
  
  draw:(message, context)=>
    context.fillStyle = 'green'
    context.fillRect @x, @y,10,10