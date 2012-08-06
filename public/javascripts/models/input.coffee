class window.Input extends Backbone.Model
	initialize: ->
		$(window).mousemove @move 
	move: (event)->
		#console.log event