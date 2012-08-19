class window.LocalPlayer extends Backbone.Model
  initialize: (@app)->
    @x = Math.round Math.random() * 600
    @y = Math.round Math.random() * 400
    @rotation = Math.round Math.random() * 360
    @acceleration = 2
    @keyDown = false
    @mouseX = @x
    @mouseY = @y
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
    @mouseX = mouseLocation.x
    @mouseY = mouseLocation.y
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
    @x -= Math.round forwardspeed * Math.sin @app.radians @rotation      
    @y += Math.round forwardspeed * Math.cos @app.radians @rotation

    sidespeed = @instructions[0] * @acceleration
    @x -= Math.round sidespeed * Math.sin @app.radians @rotation - @rotationModifier      
    @y += Math.round sidespeed * Math.cos @app.radians @rotation - @rotationModifier
    @transmit()
  
  keyUp: (event)=>
    @keyDown = false;
  
  transmit: ->
    @app.socket.emit "move player",
      x: @x
      y: @y
      rotation: @rotation
  
  paint:(context)->
    context.fillStyle = '#ccc'
    context.fillEllipse 0, 0, 10
    context.fillStyle = 'black'
    context.fillEllipse 3, -3, 3
    context.fillEllipse -3, -3, 3
    context.fillStyle = 'white'
    context.fillEllipse 3, -4, 1
    context.fillEllipse -3, -4, 1
    
  draw:(message, context)=>
    @step() if @keyDown
    context.fillStyle = 'rgba(100,100,255,0.3)'
    context.fillEllipse(@mouseX, @mouseY, 5);
    context.translate @x, @y
    context.rotate @app.radians @rotation
    @paint(context)
    context.rotate 0 - @app.radians @rotation
    context.translate -@x, -@y