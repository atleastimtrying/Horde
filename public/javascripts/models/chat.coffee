class window.Chat extends Backbone.Model
  initialize:->
    @input = $ '.chat input'
    @input.keyup @keyup
    @output = $ '.chat'
    connection = ''
    @socket = io.connect 'http://' + window.location.hostname
    @socket.on 'connect', @connect
    @socket.on 'disconnect', @disconnect
    @socket.on 'new message', @newMessage
  keyup:(event)=> 
    @submit() if event.keyCode == 13

  submit:->
    message = @input.val()
    @socket.emit "new message", 
      message: message
      type: 'message' 
    @input.val ''
    @print message, 'me'

  connect: => @print 'connected', 'info'
  disconnect: => @print 'disconnected', 'warning'
  print: (message, type)-> @output.append "<p class='#{type}'>#{message}</p>"
  newMessage: (data)=> @print data.message, data.type
