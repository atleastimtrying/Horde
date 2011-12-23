class window.Sockets
  constructor: (@app)->
    @socket = io.connect 'http://localhost'
    @socket.on 'download', @updatePos
    @socket.on 'twitter login response', @twitterLoginResponse

  emitTwitterID: =>
    @socket.emit 'logged in',{
      twitter_id: @app.user.attributes.id
    }

  updatePos: (data)->
    console.log data

  twitterLoginResponse: (data)->
    console.log data
