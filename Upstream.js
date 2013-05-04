/* Upstream handles passing tokens to upstream machines, either redis or other StatStreams*/
var _ = require('underscore');
var StatStream = require('./StatStream.js');
var redis = require('redis');

var type = null;
var hostname = null;
var port = null;
var client = null;
var prefix = 'stat:'

exports.configure = function(t, h, p) {
  type = t;
  hostname = h;
  port = p;
  client = redis.createClient(port, hostname); 
};

exports.push = function(stat) {
  if (type == 'redis') {
    push_redis(stat);
  }
  if (type == 'combiner') {
    push_combiner(stat);
  }
};

//pushes to upstream redis
function push_redis(stat) {
  var val = stat.stat.val();
  if (val == null) {
    val = 'null';
  }
  client.set(prefix+stat.name, val);
}

//TODO - IMPLEMENT COMBINER
//push to upstream combiner
function push_combiner(stat) {
  throw new Error('push_combiner not implemented');
} 
