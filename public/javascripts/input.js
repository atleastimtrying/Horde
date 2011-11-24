(function() {
  var App, Sketch;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Sketch = function(p5) {
    p5.setup = function() {
      p5.size(200, 200);
      p5.background(150);
      p5.stroke(255);
      p5.smooth();
      this.x = p5.width / 2;
      return this.y = p5.height / 2;
    };
    return p5.draw = function() {
      p5.background(150);
      p5.line(this.x, this.y, window.app.corex + this.x, window.app.corey + this.y);
      return p5.ellipse(window.app.corex + this.x, window.app.corey + this.y, 20, 20);
    };
  };

  App = (function() {

    function App() {
      this.emitTwitterID = __bind(this.emitTwitterID, this);
      this.onKeyPress = __bind(this.onKeyPress, this);
      this.onDeviceMotion = __bind(this.onDeviceMotion, this);
      this.makeUser = __bind(this.makeUser, this);      this.setupSockets();
      this.setupTwitter();
      this.setupProcessing();
      this.setupInputs();
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

    App.prototype.setupProcessing = function() {
      this.corex = 0;
      this.corey = 0;
      this.canvas = $('#canvas');
      return this.processing = new Processing(this.canvas[0], Sketch);
    };

    App.prototype.setupInputs = function() {
      $(window).bind('devicemotion', this.onDeviceMotion);
      return $(window).bind('keypress', this.onKeyPress);
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

    App.prototype.onDeviceMotion = function(event) {
      if (this.user) {
        this.corex = event.accelerationIncludingGravity.y * -10;
        this.corey = event.accelerationIncludingGravity.x * -10;
        return this.emitPosition();
      }
    };

    App.prototype.onKeyPress = function(event) {
      var code;
      if (this.user) {
        code = event.keyCode;
        if (code === 38) this.corey -= 5;
        if (code === 40) this.corey += 5;
        if (code === 37) this.corex -= 5;
        if (code === 39) this.corex += 5;
        return this.emitPosition();
      }
    };

    App.prototype.emitPosition = function() {
      return this.socket.emit('upload', {
        x: this.corex,
        y: this.corey,
        twitter_id: this.user.attributes.id
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
