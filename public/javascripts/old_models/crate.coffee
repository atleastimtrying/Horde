class window.Crate
  constructor: (@x,@y, @ammo, @app)->
    @p5 = @app.p5

  draw: =>
    if @ammo
      @p5.fill 0,150,0
    else
      @p5.fill 150,0,0
    @p5.translate @x, @y
    @p5.rect -20, -20, 40, 40
    @p5.translate -@x, -@y
    @hitTest()
  
  hitTest: ->
    if @app.intersect @, @app.localPlayer
      if @ammo
        @app.localPlayer.ammo += 5
      else
        @app.localPlayer.health += 5
      @die()

  die: ->
    @app.crates.splice @app.crates.indexOf(@), 1

