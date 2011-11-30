class window.Enemy
  constructor: (@p5, @app)->
    @x = @p5.width
    @y = @p5.random @p5.height
    @angle = @p5.random 360
    @acceleration = @p5.random 1.5
    @rotationSpeed = 1
    @health = 5
    @ammo = 20
    @shotlimit = @shottimer = 150 + @p5.random 70
    @hittimer = 20
    @dead = false
    @player = false

  draw: =>
    @angle = @p5.degrees 90 + @p5.atan2 @app.players[0].y - @y, @app.players[0].x - @x
    @p5.translate @x, @y
    @p5.rotate @p5.radians @angle
    @drawEnemy()
    @p5.rotate @p5.radians -@angle
    @p5.translate -@x, -@y
    @rotation %= 360
    @attack()
    @step()

  drawEnemy: ->
    @p5.fill 0
    @p5.rect -20, -10, 40, 20
    @p5.fill 200, 100, 10
    @p5.ellipse 0, 0, 20, 20
    @p5.rect -20, -15, 10, 5
    @p5.rect 10,-15,10,5

  step: ->
    @x += @acceleration * @p5.sin @p5.radians @angle
    @y -= @acceleration * @p5.cos @p5.radians @angle

  attack: ->
    if @app.intersect(@, @app.players[0])
      if @hittimer > 0
        @hittimer -= 1
      else
        @hittimer = 20
        @app.players[0].hit()
    else
      if @shottimer > 0
        @shottimer -= 1
      else
        @shottimer = @shotlimit
        @shoot()     

  hit: =>
    if @health > 1
      @health -= 1
    else
      @die()
  
  die: =>
    @dead = true
    @app.killCount += 1

  shoot: =>
    if @ammo > 0
      @app.bullets.push new Bullet @, @p5
      @ammo -=1;