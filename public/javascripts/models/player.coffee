class window.Player 
  constructor: (@p5, @app)->
    @x = @p5.width/2
    @y = @p5.height/2
    @angle = @p5.random 360
    @acceleration = 2
    @rotationSpeed = 1
    @health = 10
    @ammo = 20
    @player = true
  
  draw: =>
    @angle = @p5.degrees 90 + @p5.atan2 @p5.mouseY - @y, @p5.mouseX - @x
    @p5.translate @x, @y
    @p5.rotate @p5.radians @angle
    @drawMan()
    @p5.rotate @p5.radians -@angle
    @p5.translate -@x, -@y
    @rotation %= 360

  drawMan: ->
    @p5.fill 255
    @p5.rect -20, -10, 40, 20
    @p5.fill 200, 100, 10
    @p5.ellipse 0, 0, 20, 20
    @p5.rect -20, -15, 10, 5
    @p5.rect 10,-15,10,5

  hit: =>
    if @health > 1
      @health -= 1
    else
      @die()
  
  die: =>
    @x = @p5.width/2
    @y = @p5.height/2
    @health = 10

  shoot: =>
    if @ammo > 0
      @app.bullets.push new Bullet @, @p5
      ammo -=1;

  step: (instructions)=>

    forwardspeed = instructions[1] * @acceleration
    @x -= forwardspeed * @p5.sin @p5.radians @angle      
    @y += forwardspeed * @p5.cos @p5.radians @angle

    sidespeed = instructions[0] * @acceleration
    @x -= sidespeed * @p5.sin @p5.radians @angle - 90      
    @y += sidespeed * @p5.cos @p5.radians @angle - 90
