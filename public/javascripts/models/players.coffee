class window.Players extends Backbone.Collection
  model:Player
  initialize:(@app)->
  	console.log 'players initialized'