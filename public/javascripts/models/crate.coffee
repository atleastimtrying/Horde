class window.Crate
  constructor: (@x,@y, @ammo, @app)->
    @dead = false
    @p5 = @app.p5

  draw: =>
    if @dead isnt true
      if @ammo
        @p5.fill 0,150,0
      else
        @p5.fill 150,0,0
      @p5.translate @x, @y
      @p5.rect -20, -20, 40, 40
      @p5.translate -@x, -@y
      @hitTest()
  
  hitTest: ->
    for player in @app.players
      do (player)=>
        if @app.intersect @, player
          if @ammo
            player.ammo += 5
          else
            player.health += 5
          @dead = true

