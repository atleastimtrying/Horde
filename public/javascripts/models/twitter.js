(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Twitter = (function() {

    function Twitter(app) {
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

    Twitter.prototype.makeUser = function(user) {
      this.app.user = user;
      $('body').append('<button id="logout" type="button">log out of this site on twitter</button>');
      return $('#logout').bind('click', function() {
        return twttr.anywhere.signOut();
      });
    };

    Twitter.prototype.destroyUser = function() {
      this.app.user = {};
      return $('#logout').remove();
    };

    return Twitter;

  })();

}).call(this);
