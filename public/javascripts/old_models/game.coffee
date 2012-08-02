class window.Game extends Backbone.Model
  initialize: ->
    @context = $('canvas')[0].getContext '2d'
    #@input = new Input @
    #@players = new Players @
    #@sockets = new Sockets @
    # @twittermanager = new TwitterManager @
    # @bullets = []
    # @enemies = []
    # @crates = []
    # @bombs = []
    # @kills = 0
    # @deaths = 0
    # @paused = false
  draw: =>
    @context.fillStyle = "gray"

    # @drawtest @crates
    # @drawtest @bullets
    # @drawtest @enemies
    # @drawtest @bombs
    #@localPlayer.draw()
    #@displayStats()
    #@addEnemies()
  
  # intersect: (obj1, obj2)=> @p5.dist(obj1.x, obj1.y, obj2.x, obj2.y) < 40

  # displayStats: ->
  #   $('.kills').html "kills : #{@kills}"
  #   $('.deaths').html "deaths : #{@deaths}"
  #   $('.ammo').html "ammo : #{@localPlayer.ammo}"
  #   $('.health').html "health : #{@localPlayer.health}"

  # pauseToggle: =>
  #   if @paused
  #     @p5.loop()
  #     @paused = false
  #   else
  #     @p5.noLoop()
  #     @paused = true
  
  #drawtest: (array)-> obj.draw() if obj for obj in array 

  #addEnemies: -> @enemies.push new Enemy @ if @enemies.length < 5