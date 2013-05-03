//reads config files and returns a dictionary of StatStream objects
//the keys are tokens
var fs = require('fs');
var StatStream = require('./StatStream.js');
var _ = require('underscore');

exports.load = function(path, callback) {
  fs.readFile(path, function(err, data){
    if (err) throw err;
    j = JSON.parse(data);
    o = {};
    _.each(j, function(i){
      o[i.token] = {
        interval: i.interval,
        stat: new StatStream.StatStream(i.type)
      };
    });
    callback(o);
  });
};
