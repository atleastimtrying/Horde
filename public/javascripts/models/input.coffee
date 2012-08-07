class window.Input
  constructor: (@app)->
    $(window).bind 'keydown', @keyPressDown
    $(window).bind 'keyup', @keyPressUp
    $('canvas').mousedown @clicked
    @keyDown = false
  keyPressDown : (event)=>
    message = 'up' if event.keyCode is 87 #w
    message = 'down' if event.keyCode is 83 #s
    message = 'left' if event.keyCode is 65 #a
    message = 'right' if event.keyCode is 68 #d
    message = 'bomb' if event.keyCode is 66 #b
    message = 'pause' if event.keyCode is 32 #spacebar
    $(@app).trigger message
  keyPressUp : =>
    $(@app).trigger 'keyup'
  clicked : (event)=>
    message = 'left' if event.which is 1
    message = 'right' if event.which is 3
    $(@app).trigger message