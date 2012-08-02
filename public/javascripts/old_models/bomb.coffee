class window.Bomb
  constructor: (@owner)->
    @app = @owner.app
    @p5 = @owner.p5
    @x = @owner.x
    @y = @owner.y
    @displayInteger = 3
    @timer = @displayInteger * 60
    @isExploding = false
    console.log @

  draw: => 
    @p5.fill 30
    @p5.translate @x, @y
    @p5.ellipse 0,0,5,5
    @p5.text @displayInteger, -10, -10
    @p5.translate -@x, -@y
    @timerCountdown()
    @exploding if @isExploding
  
  timerCountdown: =>
    @displayInteger -= 1 if @timer is 120 or @timer is 60

    if @timer <= 0 && @isExploding is false
      @explode()
    else
      @timer -= 1

  explode: ->
    @isExploding = true
    @blastTimer = 50
    @killtest(enemy) if enemy for enemy in @app.enemies

  killtest: (enemy)->
    enemy.die() if enemy && @p5.dist(@x,@y,enemy.x,enemy.y) < 100

  die: ->
    @app.bombs.splice @app.bombs.indexOf(@), 1

  exploding: ->
    @p5.fill 200,100,0
    if @blastTimer > 25
      @p5.ellipse x, y, 4 * 25 - @blastTimer, 4 * 25 - @blastTimer
    else
      @p5.ellipse @x, @y, 4 * @blastTimer, 4 * @blastTimer
    
    @blastTimer -= 1
    
    @die() if blastTimer < 0