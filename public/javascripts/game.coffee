class window.Game extends Backbone.Model
  initialize: ->
    @set {
      input : new window.Input()
      players : new window.Players()
      #bullets : new window.Bullets()
      #enemies : new window.Enemies()
    }
    @p5 = new Processing $('canvas')[0], @sketch

  sketch: (p5)=>  
    p5.setup = ->
      p5.size $('canvas').width(),$('canvas').height()
      p5.background 0x666666
      p5.noStroke()
      p5.smooth()
      
    p5.draw = @draw

  draw: =>
    @p5.ellipse @p5.random(@p5.width), @p5.random(@p5.height),10,10
    