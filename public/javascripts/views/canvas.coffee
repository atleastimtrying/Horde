class window.CanvasView
  constructor: (@app)->
    @canvas = $ 'canvas'
    @context = @canvas[0].getContext '2d'
    @canvas.css
      width:"700px" 
      height:'400px'
    @canvas[0].width = 700
    @canvas[0].height = 400
    @render()
    $(@app).bind 'playerdrawn', @drawPlayer
  render: ->
  drawPlayer: (event, data)=>
    @context.clearRect data.x - 2, data.y - 2, 14, 14
    @context.fillStyle = 'black'
    @context.fillRect data.x, data.y,10,10
