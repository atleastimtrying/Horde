class window.Input

  constructor: (@app)->
    $(window).bind 'keydown', @keyPressDown
    $(window).bind 'keyup', @keyPressUp
    $('canvas').mousedown @clicked
    @keyDown = false

  keyPressDown : (event)=>
    @keyDown = true

    @app.localPlayer.instructions = [0, -1] if event.keyCode is 87 #w

    @app.localPlayer.instructions = [0, 1] if event.keyCode is 83 #s

    @app.localPlayer.instructions = [-1, 0] if event.keyCode is 65 #a

    @app.localPlayer.instructions = [1, 0] if event.keyCode is 68 #d

    @app.localPlayer.instructions = [1, 0] if event.keyCode is 68 #d

    #@app.localPlayer.dropBomb() if event.keyCode is 66 #b

    #@app.pauseToggle() if event.keyCode is 32 #spacebar

  keyPressUp : =>
    @keyDown = false
    @app.localPlayer.instructions = [0, 0]

  clicked : (event)=>
    @app.localPlayer.shoot() if event.which is 1
    @app.localPlayer.melee() if event.which is 3
    