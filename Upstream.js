/* Upstream handles passing tokens to upstream machines, either redis or other StatStreams*/
var _ = require('underscore');
var StatStream = require('./StatStream.js');

var type = null;
var hostname = null;
var port = null;

exports.configure = function(t, h, p) {
  type = t;
  hostname = h;
  port = p;
};

exports.push = function(stat) {
  if (type == 'redis') {
    push_redis(stat);
  }
  if (type == 'combiner') {
    push_combiner(stat);
  }
};

//TODO - NEED TO IMPLEMENT UPSTREAMS
//pushes to upstream redis
function push_redis(stat) {

}

//push to upstream combiner
function push_combiner(stat) {

} 
