Sketch = (p5) ->  
  p5.setup = ->
    p5.size 200,200
    p5.background 150
    p5.stroke 255
    p5.smooth()
    @x = p5.width/2
    @y = p5.height/2
    
  p5.draw = ->
    p5.background 150
    p5.line @x,@y, window.app.corex + @x, window.app.corey + @y
    p5.ellipse window.app.corex + @x, window.app.corey + @y, 20,20

class App
  constructor: ->
    @setupSockets()
    @setupTwitter()
    @setupProcessing()
    @setupInputs()
     
  setupSockets: ->
    @socket = io.connect 'http://localhost'
    @socket.on 'download', @updatePos
    @socket.on 'twitter login response', @twitterLoginResponse
  
  setupTwitter: ->
    twttr.anywhere (T)=>

      T('#login').connectButton()
      
      @makeUser T.currentUser if T.isConnected()
      
      T.bind 'authComplete', =>
        @makeUser T.currentUser

      T.bind 'signOut', =>
        @destroyUser()

  setupProcessing: ->
    @corex = 0
    @corey = 0
    @canvas = $('#canvas')
    @processing = new Processing @canvas[0], Sketch

  setupInputs: ->
    $(window).bind 'devicemotion', @onDeviceMotion
    $(window).bind 'keypress', @onKeyPress

  makeUser: (@user)=>
    $('body').append '<button id="logout" type="button">log out of this site on twitter</button>'
    $('#logout').bind 'click', ->
      twttr.anywhere.signOut()
    @emitTwitterID()

  destroyUser: ->
    @user = {}
    $('#logout').remove()

  onDeviceMotion: (event)=>
    if @user
      @corex = event.accelerationIncludingGravity.y * -10
      @corey = event.accelerationIncludingGravity.x * -10
      @emitPosition()

  onKeyPress: (event)=>
    if @user
      code = event.keyCode
      @corey -= 5 if code is 38
      @corey += 5 if code is 40
      @corex -= 5 if code is 37
      @corex += 5 if code is 39
      @emitPosition()

  emitPosition: ->
    @socket.emit 'upload', {
      x: @corex
      y: @corey
      twitter_id: @user.attributes.id
    }

  emitTwitterID: =>
    @socket.emit 'logged in',{
      twitter_id: @user.attributes.id
    }

  twitterLoginResponse: (data)->
    @siblingId = data.twitterid if data.success
$ ->
  window.app = new App()
