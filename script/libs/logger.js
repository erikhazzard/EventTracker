(function() {
  ' ========================================================================    \n\nLogging System\n    \n======================================================================== ';
  EVENT_TRACKER.logger = {};

  EVENT_TRACKER.logger.options = {
    log_level: 'all'
  };

  EVENT_TRACKER.logger.history = {};

  EVENT_TRACKER.logger.can_log = function(type) {
    'This function takes in a type (e.g., \'warn\') and checks to see if\nit exists in the EVENT_TRACKER.logger.options.log_level option';
    var log_level, return_value;
    return_value = false;
    log_level = EVENT_TRACKER.logger.options.log_level;
    if (log_level === 'all' || log_level === true) {
      return_value = true;
    } else if (log_level instanceof Array) {
      if (log_level.indexOf(type) > -1) return_value = true;
    } else if (log_level === null || log_level === void 0 || log_level === 'none' || log_level === false) {
      return_value = false;
    } else {
      if (log_level === type) return_value = true;
    }
    return return_value;
  };

  EVENT_TRACKER.logger.log = function(type) {
    'When using logger.log, you must pass in a type\ne.g.\n    EVENT_TRACKER.logger.debug( arg1, arg2, etc. )';
    var args, cur_date, log_history;
    args = Array.prototype.slice.call(arguments);
    if (!(type != null) || arguments.length === 1) {
      type = 'debug';
      args.splice(0, 0, 'debug');
    }
    if (!EVENT_TRACKER.logger.can_log(type)) return false;
    cur_date = new Date();
    args.push({
      'Date': cur_date,
      'Milliseconds': cur_date.getMilliseconds(),
      'Time': cur_date.getTime()
    });
    log_history = EVENT_TRACKER.logger.history;
    log_history[type] = log_history[type] || [];
    log_history[type].push(args);
    if (window.console) console.log(Array.prototype.slice.call(args));
    return true;
  };

  EVENT_TRACKER.logger.options.log_types = ['debug', 'error', 'info', 'warn'];

  EVENT_TRACKER.logger.options.setup_log_types = function() {
    'This function will setup log types based on the ones available in\nEVENT_TRACKER.logger.options.log_types.  It can be called whenever to \ndynamically add log types';
    var log_type, _i, _len, _ref, _results;
    _ref = EVENT_TRACKER.logger.options.log_types;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      log_type = _ref[_i];
      _results.push((function(log_type) {
        if (!EVENT_TRACKER.logger[log_type]) {
          return EVENT_TRACKER.logger[log_type] = function() {
            var args;
            args = Array.prototype.slice.call(arguments);
            args.splice(0, 0, log_type);
            return EVENT_TRACKER.logger.log.apply(null, args);
          };
        }
      })(log_type));
    }
    return _results;
  };

  EVENT_TRACKER.logger.options.setup_log_types();

  ' ========================================================================    \nConfigure console.log\n======================================================================== ';

  if (window.console && EVENT_TRACKER.logger.options) {
    if (EVENT_TRACKER.logger.options.log_level === 'none' || EVENT_TRACKER.logger.options.log_level === null) {
      console.log = function() {
        return {};
      };
    }
  }

  if (!(window.console != null)) {
    window.console = {
      log: function() {
        return {};
      }
    };
  }

  window.onerror = function(msg, url, line) {
    EVENT_TRACKER.logger.error(msg, url, line);
    return false;
  };

}).call(this);
