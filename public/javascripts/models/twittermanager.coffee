class window.TwitterManager extends Backbone.Model
  initialize : ->
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