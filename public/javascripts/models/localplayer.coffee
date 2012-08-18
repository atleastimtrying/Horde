class window.LocalPlayer extends Backbone.Model
  initialize: (@app)->
    @x = Math.random() * 600
    @y = Math.random() * 400
    @rotation = Math.random() * 360
    @acceleration = 2
    @keyDown = false
    # @health = 10
    # @ammo = 20
    # @player = true
    @bindings()
    @rotationModifier = 90
    @instructions = [0,0]
  
  bindings:->
    $(@app).bind 'moved', @moved
    #$(@app).bind 'click', @click
    $(@app).bind 'key', @key
    $(@app).bind 'keyup', @keyUp
    $(@app).bind 'draw', @draw
  
  click: (event, data)=>
    @rotation += 10
    @transmit()
  
  moved:(event, mouseLocation)=>
    @rotation = @app.degrees(Math.atan2(mouseLocation.y - @y, mouseLocation.x - @x)) + 90
    @rotation %= 360
  
  key: (event, data)=>
    @keyDown = true
    @instructions = [0, -1] if data is 'up'
    @instructions = [0, 1] if data is 'down'

    @instructions = [-1, 0] if data is 'left'

    @instructions = [1, 0] if data is 'right'
  
  step: ->
    forwardspeed = @instructions[1] * @acceleration
    @x -= forwardspeed * Math.sin @app.radians @rotation      
    @y += forwardspeed * Math.cos @app.radians @rotation

    sidespeed = @instructions[0] * @acceleration
    @x -= sidespeed * Math.sin @app.radians @rotation - @rotationModifier      
    @y += sidespeed * Math.cos @app.radians @rotation - @rotationModifier
    @transmit()
  
  keyUp: (event)=>
    @keyDown = false;
  
  transmit: ->
    @app.socket.emit "move player",
      x: @x
      y: @y
      rotation: @rotation
  
  draw:(message, context)=>
    @step() if @keyDown
    context.translate @x, @y
    context.rotate @app.radians @rotation
    context.fillStyle = 'green'
    context.fillRect -5, -5,10,10
    context.rotate 0 - @app.radians @rotation
    context.translate -@x, -@y