class window.Bullet
  constructor: (@owner)->
    @app = @owner.app
    @p5 = @owner.p5
    @x = @owner.x
    @y = @owner.y
    @angle = @owner.angle
    @speed = 3
    @xspeed = @speed * @p5.sin @p5.radians @angle + 180
    @yspeed = @speed * @p5.cos @p5.radians @angle + 180

  draw: => 
    @p5.fill 0
    @p5.ellipse @x,@y,2,2
    @x -= @xspeed
    @y += @yspeed
    @hitTest()
  
  hitTest: =>
    @die() if @offEdge()
    #@die if cover.intersect(@) for cover in @app.covers
    if @owner.player
      for enemy in @app.enemies
        do (enemy) =>
          if enemy and @app.intersect(@,enemy)
            enemy.hit()
            @die()
    else
      if @app.intersect(@ , @app.localPlayer)
        @app.localPlayer.hit()
        @die()

  offEdge: ->
    @x > @p5.width || @x < 0 || @y > @p5.height || @y < 0

  die: ->
    @app.bullets.splice @app.bullets.indexOf(@), 1
