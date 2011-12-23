class window.Game
  constructor: ->
    @input = new Input @
    @sockets = new Sockets @
    @twittermanager = new TwitterManager @
    @players = []
    @bullets = []
    @enemies = []
    @crates = []
    @bombs = []
    @p5 = new Processing $('canvas')[0], @sketch
    @localPlayer = new Player @
    @kills = 0
    @deaths = 0
    @paused = false

  sketch: (p5)=>  
    p5.setup = ->
      p5.size $('canvas').width(),$('canvas').height()
      p5.background 0x666666
      p5.noStroke()
      p5.smooth()      

    p5.draw = @draw

  fillEnemies: ->
    @enemies = []


  draw: =>
    @p5.background 150

    @drawtest @crates
    @drawtest @bullets
    @drawtest @players
    @drawtest @enemies
    @drawtest @bombs
    @localPlayer.draw()
    @displayStats()
    #@addEnemies()
  
  intersect: (obj1, obj2)=>
    @p5.dist(obj1.x, obj1.y, obj2.x, obj2.y) < 40

  displayStats: ->
    $('.kills').html "kills : #{@kills}"
    $('.deaths').html "deaths : #{@deaths}"
    $('.ammo').html "ammo : #{@localPlayer.ammo}"
    $('.health').html "health : #{@localPlayer.health}"

  pauseToggle: =>
    if @paused
      @p5.loop()
      @paused = false
    else
      @p5.noLoop()
      @paused = true
  
  drawtest: (array)->
    for obj in array
      do (obj)->
        obj.draw() if obj 

  addEnemies: ->
    @enemies.push new Enemy @ if @enemies.length < 5