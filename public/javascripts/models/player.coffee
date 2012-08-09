class window.Player extends Backbone.Model
  initialize: (data)->
    @x = data.x
    @y = data.y
    @id = data.id