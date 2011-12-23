class window.TwitterManager
  constructor : (@app)->
    twttr.anywhere (T)=>

      T('#login').connectButton()
      
      @makeUser T.currentUser if T.isConnected()
      
      T.bind 'authComplete', =>
        @makeUser T.currentUser

      T.bind 'signOut', =>
        @destroyUser()

  makeUser: (user)=>
    @app.user = user
    $('body').append '<button id="logout" type="button">log out of this site on twitter</button>'
    $('#logout').bind 'click', ->
      twttr.anywhere.signOut()
    @app.sockets.emitTwitterID()

  destroyUser: ->
    @user = {}
    $('#logout').remove()