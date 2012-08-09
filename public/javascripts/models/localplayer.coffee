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
    @instructions = [0, 0]
    @bindings()
  bindings:()->
    $(@app).bind 'click', @click
    $(@app).bind 'key', @key
  click: (event, data)->
    
  key: (event, data)=>
    @y -= 1 if data is 'up'
    @y += 1 if data is 'down'
    @x -= 1 if data is 'left'
    @x += 1 if data is 'right'
    $(@app).trigger 'playerdrawn', 
      x: @x
      y: @y