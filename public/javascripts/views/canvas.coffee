class window.CanvasView
  constructor: ->
    @canvas = $ 'canvas'
    @context = @canvas[0].getContext '2d'
    @canvas.css
      width:"700px" 
      height:'400px'
    @canvas[0].width = 700
    @canvas[0].height = 400
    @render()
  render: ->
    @context.fillRect 10,10,10,10