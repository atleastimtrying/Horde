class window.Input

  constructor: (@app)->
    $(window).bind 'keydown', @keyPressDown
    $(window).bind 'keyup', @keyPressUp
    $('canvas').mousedown @clicked
    @keyDown = false

  keyPressDown : (event)=>
    @keyDown = true

    @app.players[0].instructions = [0, -1] if event.keyCode is 87 #w

    @app.players[0].instructions = [0, 1] if event.keyCode is 83 #s

    @app.players[0].instructions = [-1, 0] if event.keyCode is 65 #a

    @app.players[0].instructions = [1, 0] if event.keyCode is 68 #d

  keyPressUp : =>
    @keyDown = false
    
    @app.players[0].instructions = [0, 0]

  clicked : (event)=>
    @app.players[0].shoot() if event.which is 1
    @app.players[0].melee() if event.which is 3
    