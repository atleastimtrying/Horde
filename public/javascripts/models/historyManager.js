(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.HistoryManager = (function() {

    function HistoryManager(app) {
      this.app = app;
      this.push = __bind(this.push, this);
      this.navClick = __bind(this.navClick, this);
      this.history = window.history;
      $('a').click(this.navClick);
    }

    HistoryManager.prototype.navClick = function(event) {
      var state;
      state = $(event.currentTarget).attr('href');
      this.push(state);
      return false;
    };

    HistoryManager.prototype.push = function(state) {
      return this.history.pushState(null, null, state);
    };

    return HistoryManager;

  })();

}).call(this);
