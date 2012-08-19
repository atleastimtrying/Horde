(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.TwitterManager = (function() {
    function TwitterManager(app) {
      this.app = app;
      this.makeUser = __bind(this.makeUser, this);
      twttr.anywhere(__bind(function(T) {
        T('#login').connectButton();
        if (T.isConnected()) {
          this.makeUser(T.currentUser);
        }
        T.bind('authComplete', __bind(function() {
          return this.makeUser(T.currentUser);
        }, this));
        return T.bind('signOut', __bind(function() {
          return this.destroyUser();
        }, this));
      }, this));
    }
    TwitterManager.prototype.makeUser = function(user) {
      this.app.user = user;
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
