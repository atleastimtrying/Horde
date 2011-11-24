(function() {
  var App;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = (function() {

    function App() {
      this.makeUser = __bind(this.makeUser, this);      this.setupSockets();
      this.setupTwitter();
    }

    App.prototype.setupSockets = function() {
      this.socket = io.connect('http://localhost');
      this.socket.on('download', this.updatePos);
      return this.socket.on('twitter login response', this.twitterLoginResponse);
    };

    App.prototype.setupTwitter = function() {
      var _this = this;
      return twttr.anywhere(function(T) {
        T('#login').connectButton();
        if (T.isConnected()) _this.makeUser(T.currentUser);
        T.bind('authComplete', function() {
          return _this.makeUser(T.currentUser);
        });
        return T.bind('signOut', function() {
          return _this.destroyUser();
        });
      });
    };

    App.prototype.makeUser = function(user) {
      this.user = user;
      $('body').append('<button id="logout" type="button">log out of this site on twitter</button>');
      $('#logout').bind('click', function() {
        return twttr.anywhere.signOut();
      });
      return this.emitTwitterID();
    };

    App.prototype.destroyUser = function() {
      this.user = {};
      return $('#logout').remove();
    };

    App.prototype.updatePos = function(data) {
      return $('h2').css({
        left: data.x,
        top: data.y
      });
    };

    App.prototype.emitTwitterID = function() {
      return this.socket.emit('logged in', {
        twitter_id: this.user.attributes.id
      });
    };

    App.prototype.twitterLoginResponse = function(data) {
      if (data.success) return this.siblingId = data.twitterid;
    };

    return App;

  })();

  $(function() {
    return window.app = new App();
  });

}).call(this);
