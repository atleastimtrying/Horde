class App
  constructor: ->
    @setupSockets()
    @setupTwitter()
      
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

  makeUser: (@user)=>
    $('body').append '<button id="logout" type="button">log out of this site on twitter</button>'
    $('#logout').bind 'click', ->
      twttr.anywhere.signOut()
    @emitTwitterID()
  
  destroyUser: ->
    @user = {}
    $('#logout').remove()

  updatePos: (data)->
    $('h2').css {
      left:data.x
      top:data.y
    }

  emitTwitterID: ->
    @socket.emit 'logged in',{
      twitter_id: @user.attributes.id
    }

  twitterLoginResponse: (data)->
    @siblingId = data.twitterid if data.success

$ ->
  window.app = new App()