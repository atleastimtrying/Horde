class window.Input

  constructor: (@app)->
    $(window).keypress @keyPressSet
    @instructions = [0, 0]

  keyPressSet : (event)=>
    if event.charCode is 119 #w
      @instructions = [0, -1]
    else if event.charCode is 115 #s
      @instructions = [0, 1]
    else if event.charCode is 97 #a
      @instructions = [-1, 0]
    else if event.charCode is 100 #d
      @instructions = [1, 0]
    else
      @instructions = [0, 0]
    @app.players[0].step @instructions