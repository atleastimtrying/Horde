class window.Input
  constructor: (@app)->
    $(window).bind 'keydown', @keyPressDown
    $(window).bind 'keyup', @keyPressUp
    $('canvas').mousedown @clicked
  keyPressDown : (event)=>
    message = 'up' if event.keyCode is 87 #w
    message = 'down' if event.keyCode is 83 #s
    message = 'left' if event.keyCode is 65 #a
    message = 'right' if event.keyCode is 68 #d
    message = 'bomb' if event.keyCode is 66 #b
    message = 'pause' if event.keyCode is 32 #spacebar
    @app.trigger 'key',message
  keyPressUp : =>
    @app.trigger 'keyup'
  clicked : (event)=>
    message = 'leftclick' if event.which is 1
    message = 'rightclick' if event.which is 3
    @app.trigger 'click', message