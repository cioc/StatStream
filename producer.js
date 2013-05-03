var net = require('net');

var hostname = null;
var port = null;
var intervals = [];

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
      client.write(item);
      client.end();
    });
  }
}

exports.repeat = function(pattern, interval) {
  var x = function () {
    send(pattern);
  };
  setInterval(x, interval);
};

exports.increment = function(start, interval) { 
  incr = start;
  var x = function() {
    send(incr);
    incr += 1;
  };
  setInterval(x, interval);
};

exports.random = function(interval) {
  var x = function() {
    send(Math.random()); 
  };
  setInterval(x, interval);
}

exports.array = function(arr, interval) {
  incr = 0;
  var x = function() {
    if (incr < arr.length) {
      send(arr[incr]);
      incr += 1; 
    }
  };
  setInterval(x, interval);
}
