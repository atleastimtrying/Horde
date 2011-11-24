class window.Input extends Backbone.Model
  initialize: ->
    $(window).keypress @keyPressSet
    @set { instructions : [0, 0] }

  keyPressSet : (event)=>
    console.log event.charCode
    if event.charCode is 119 #w
      @set { instructions : [0, -1] }
    else if event.charCode is 115 #s
      @set { instructions : [0, 1] }
    else if event.charCode is 97 #a
      @set { instructions : [-1, 0] }
    else if event.charCode is 100 #d
      @set { instructions : [1, 0] }
    else
      @set { instructions : [0, 0] }
