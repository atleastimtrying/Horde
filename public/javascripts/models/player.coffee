class window.Player extends Backbone.Model
  initialize: (@app, data)->
    @x = data.x
    @y = data.y
    @rotation = data.rotation
    @id = data.id
    $(@app).bind 'draw', @draw
    @img = new Image()
    @img.src = '/images/man.png'
  draw:(message, context)=>
    context.translate @x, @y
    context.rotate @app.radians @rotation
    context.fillStyle = 'gray'
    context.drawImage @img, -5, -5 #, @rectWidth, @rectHeight
    context.rotate 0 - @app.radians @rotation
    context.translate -@x, -@y
  remove:=>
    $(@app).unbind 'draw', @draw
    @app.remotePlayers.splice @app.remotePlayers.indexOf(@), 1
