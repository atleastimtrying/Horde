class window.Player extends Backbone.Model
  initialize: (@game, @id)->
    @p5 = @game.p5
    @x = Math.random() * 600
    @y = Math.random() * 400
    @angle = Math.random() * 360
    @acceleration = 2
    @rotationSpeed = 1
    @health = 10
    @ammo = 20
    @player = true
    @rotationModifier = 90 #because sometimes CS makes me sad
    @instructions = [0, 0]
    #@game.players.add @
  
  draw: =>
    @angle = @p5.degrees(@p5.atan2 @p5.mouseY - @y, @p5.mouseX - @x) + @rotationModifier
    @p5.translate @x, @y
    @p5.rotate @p5.radians @angle
    @drawMan()
    @p5.rotate @p5.radians -@angle
    @p5.translate -@x, -@y
    @rotation %= 360
    @step() if @game.input.keyDown

  drawMan: ->
    @p5.fill 255
    @p5.rect -20, -10, 40, 20
    @p5.fill 200, 100, 10
    @p5.ellipse 0, 0, 20, 20
    @p5.rect -20, -15, 10, 5
    @p5.rect 10,-15,10,5

  # hit: =>
  #   if @health > 1
  #     @health -= 1
  #   else
  #     @die()
  
  # die: =>
  #   @x = @p5.width/2
  #   @y = @p5.height/2
  #   @health = 10
  #   @app.deaths += 1

  shoot: =>
  #   if @ammo > 0
  #     @app.bullets.push new Bullet @
  #     @ammo -=1
  
  # melee: =>
  #   for enemy in @app.enemies
  #     do (enemy) =>
  #       if enemy and @app.intersect(@, enemy)
  #         enemy.hit()

  step: ->
    forwardspeed = @instructions[1] * @acceleration
    @x -= forwardspeed * @p5.sin @p5.radians @angle      
    @y += forwardspeed * @p5.cos @p5.radians @angle

    sidespeed = @instructions[0] * @acceleration
    @x -= sidespeed * @p5.sin @p5.radians @angle - @rotationModifier      
    @y += sidespeed * @p5.cos @p5.radians @angle - @rotationModifier

  # dropBomb: =>
  #   @app.bombs.push new Bomb @