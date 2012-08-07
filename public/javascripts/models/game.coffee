class window.Game extends Backbone.Model
  initialize: ->
    @context = $('canvas')[0].getContext '2d'
    @input = new Input
    @chat = new Chat
    @canvasView = new CanvasView
  draw: =>
    @context.fillStyle = "gray"