class CanvasView extends Backbone.View
  el: $ 'canvas'
  initialize: ->
    @context = @canvas[0].getContext '2d'
  	_.bindAll @
  	@render()
  render: ->
    @context.fillRect 10,10,10,10