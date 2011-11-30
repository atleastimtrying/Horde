class window.Game
  constructor: ->
    @input = new window.Input @
    @players = []
    @bullets = []
    @enemies = []
    @p5 = new Processing $('canvas')[0], @sketch
    @populateGame()
    @kills = 0
    @deaths = 0

  sketch: (p5)=>  
    p5.setup = ->
      p5.size $('canvas').width(),$('canvas').height()
      p5.background 0x666666
      p5.noStroke()
      p5.smooth()
      
    p5.draw = @draw

  populateGame: ->
    @players.push new Player @p5, @
    @enemies.push new Enemy @p5, @ for amount in [0..2]

  fillEnemies: ->
    @enemies = []

  draw: =>
    @p5.background 150
    player.draw() for player in @players
    enemy.draw() for enemy in @enemies
    bullet.draw() unless bullet.dead for bullet in @bullets
    $('.kills').html "kills : #{@kills}"
    $('.deaths').html "deaths : #{@deaths}"
    $('.ammo').html "ammo : #{@players[0].ammo}"
    $('.bullets').html "bullets : #{@bullets.length}"
    $('.health').html "health : #{@players[0].health}"
  
  intersect: (obj1, obj2)=>
    @p5.dist(obj1.x, obj1.y, obj2.x, obj2.y) < 40
    