class window.Sockets extends Backbone.Model
  initialize:->
    @socket = io.connect 'http://localhost'
    @socket.on 'download', @updatePos
    @socket.on 'twitter login response', @twitterLoginResponse

  emitTwitterID: ->
    @socket.emit 'logged in',{
      twitter_id: @user.attributes.id
    }

  updatePos: (data)->
    console.log data

  twitterLoginResponse: (data)->
    console.log data
