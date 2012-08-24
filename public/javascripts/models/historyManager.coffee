class window.HistoryManager
  constructor:(@app)->
    @history = window.history
    $('a').click @navClick

  navClick: (event)=>
    state =  $(event.currentTarget).attr 'href'
    @push state
    false 
  
  push: (state)=> @history.pushState null, null, state
