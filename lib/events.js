// Generated by CoffeeScript 1.9.1
(function() {
  var EventEmitter, async, events, exit, exitWrapped, exiters;

  EventEmitter = require('events').EventEmitter;

  events = require('./events');

  async = require('async');

  exit = new EventEmitter;

  exiters = [];

  exit.onExit = function(cb) {
    return exiters.push(cb);
  };

  exitWrapped = function() {
    return async.map(exiters, function(_cb, cb) {
      return _cb(cb);
    }, process.exit);
  };

  exit.on('exit', exitWrapped);

  process.on('SIGINT', function() {
    return exit.emit('exit');
  });

  module.exports = {
    exit: exit
  };

}).call(this);