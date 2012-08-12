class window.Player extends Backbone.Model
  initialize: (@app, data)->
    @x = data.x
    @y = data.y
    @id = data.id
    $(@app).bind 'draw', @draw
  draw:(message, context)=>
    context.fillStyle = 'gray'
    context.fillRect @x, @y,10,10
  remove:=>
    $(@app).unbind 'draw', @draw
    @app.remotePlayers.splice @app.remotePlayers.indexOf(@), 1
