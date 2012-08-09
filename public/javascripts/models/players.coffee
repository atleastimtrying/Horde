class window.Players
  constructor:(@app)->
    @collection = []
  newPlayer:(data)->
  	@collection.push new Player data