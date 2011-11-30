(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.TwitterManager = (function() {

    function TwitterManager(app) {
      var _this = this;
      this.app = app;
      this.makeUser = __bind(this.makeUser, this);
      twttr.anywhere(function(T) {
        T('#login').connectButton();
        if (T.isConnected()) _this.makeUser(T.currentUser);
        T.bind('authComplete', function() {
          return _this.makeUser(T.currentUser);
        });
        return T.bind('signOut', function() {
          return _this.destroyUser();
        });
      });
    }

    TwitterManager.prototype.makeUser = function(user) {
      this.user = user;
      $('body').append('<button id="logout" type="button">log out of this site on twitter</button>');
      $('#logout').bind('click', function() {
        return twttr.anywhere.signOut();
      });
      return this.app.sockets.emitTwitterID();
    };

    TwitterManager.prototype.destroyUser = function() {
      this.user = {};
      return $('#logout').remove();
    };

    return TwitterManager;

  })();

}).call(this);
