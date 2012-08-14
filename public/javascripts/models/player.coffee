class window.Player extends Backbone.Model
  initialize: (@app, data)->
    @x = data.x
    @y = data.y
    @rotation = data.rotation
    @id = data.id
    $(@app).bind 'draw', @draw
  draw:(message, context)=>
    context.translate @x, @y
    context.rotate @app.degreesToRadians @rotation
    context.fillStyle = 'gray'
    context.fillRect -5, -5,10,10
    context.rotate 0 - @app.degreesToRadians @rotation
    context.translate -@x, -@y
  remove:=>
    $(@app).unbind 'draw', @draw
    @app.remotePlayers.splice @app.remotePlayers.indexOf(@), 1
