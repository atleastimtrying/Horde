(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Chat = (function() {

    __extends(Chat, Backbone.Model);

    function Chat() {
      this.newMessage = __bind(this.newMessage, this);
      this.disconnect = __bind(this.disconnect, this);
      this.connect = __bind(this.connect, this);
      this.keyup = __bind(this.keyup, this);
      Chat.__super__.constructor.apply(this, arguments);
    }

    Chat.prototype.initialize = function() {
      var connection;
      this.input = $('.chat input');
      this.input.keyup(this.keyup);
      this.output = $('.chat');
      connection = '';
      this.socket = io.connect('http://' + window.location.hostname);
      this.socket.on('connect', this.connect);
      this.socket.on('disconnect', this.disconnect);
      return this.socket.on('new message', this.newMessage);
    };

    Chat.prototype.keyup = function(event) {
      if (event.keyCode === 13) return this.submit();
    };

    Chat.prototype.submit = function() {
      var message;
      message = this.input.val();
      this.socket.emit("new message", {
        message: message,
        type: 'message'
      });
      this.input.val('');
      return this.print(message, 'me');
    };

    Chat.prototype.connect = function() {
      return this.print('connected', 'info');
    };

    Chat.prototype.disconnect = function() {
      return this.print('disconnected', 'warning');
    };

    Chat.prototype.print = function(message, type) {
      return this.output.append("<p class='" + type + "'>" + message + "</p>");
    };

    Chat.prototype.newMessage = function(data) {
      return this.print(data.message, data.type);
    };

    return Chat;

  })();

}).call(this);
