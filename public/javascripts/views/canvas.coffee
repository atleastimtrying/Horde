class window.CanvasView
  constructor: (@app)->
    @canvas = $ 'canvas'
    @context = @canvas[0].getContext '2d'
    @context.fillEllipse = (x,y,radius)->
      @beginPath()
      @arc x, y, radius, 0, Math.PI * 2, false
      @closePath()
      @fill()
    @canvas.css
      width:"700px" 
      height:'400px'
    @canvas[0].width = 700
    @canvas[0].height = 400
    @draw()
  draw: ()=>
    @context.clearRect 0, 0, 700, 400
    $(@app).trigger 'draw', @context
    window.setTimeout @draw, 1000/60
  
