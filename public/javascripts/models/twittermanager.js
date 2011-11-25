(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.TwitterManager = (function() {

    __extends(TwitterManager, Backbone.Model);

    function TwitterManager() {
      this.makeUser = __bind(this.makeUser, this);
      TwitterManager.__super__.constructor.apply(this, arguments);
    }

    TwitterManager.prototype.initialize = function() {
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

    TwitterManager.prototype.makeUser = function(user) {
      this.user = user;
      $('body').append('<button id="logout" type="button">log out of this site on twitter</button>');
      $('#logout').bind('click', function() {
        return twttr.anywhere.signOut();
      });
      return this.emitTwitterID();
    };

    TwitterManager.prototype.destroyUser = function() {
      this.user = {};
      return $('#logout').remove();
    };

    return TwitterManager;

  })();

}).call(this);
