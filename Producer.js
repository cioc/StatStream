//this module produces various streams of data for testing purposes
var net = require('net');
var _ = require('underscore');

var hostname = null;
var port = null;
var timeids = [];

exports.configure = function(h, p) {
  hostname = h;
  port = p;
};

function send(item) {
  if (hostname == null) {
    console.log(item);
  }
  else {
    var client = net.connect({host: hostname, port: port}, function(){
      client.write(item.toString());
      client.end();
    });
  }
}

exports.repeat = function(pattern, interval) {
  var x = function () {
    send(pattern);
  };
  timeids.push(setInterval(x, interval));
};

exports.increment = function(start, interval) { 
  incr = start;
  var x = function() {
    send(incr);
    incr += 1;
  };
  timeids.push(setInterval(x, interval));
};

exports.random = function(interval) {
  var x = function() {
    send(Math.random()); 
  };
  timeids.push(setInterval(x, interval));
}

exports.array = function(arr, interval) {
  incr = 0;
  var x = function() {
    if (incr < arr.length) {
      send(arr[incr]);
      incr += 1; 
    }
    else {
      stop();  
    }
  };
  timeids.push(setInterval(x, interval));
}

function stop() {
  _.each(timeids, function(id){
    clearInterval(id);
  });
}

exports.stop = function() {
  stop();
}
