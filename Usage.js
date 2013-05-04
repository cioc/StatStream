//BUILT FOR UBUNTU 12.04
var fs = require('fs');
var _ = require('underscore');

function read_proc_stat(callback) {
  fs.readFile('/proc/stat', function(err, data){
    if (err) throw err;
    lines = data.toString().split('\n');
    o = {};
    _.each(lines, function(l){
      pieces = l.split(' ');
      k = pieces.shift();
      o[k] = [];
      _.each(pieces, function(p){
        if (p.length > 0) {
          o[k].push(parseInt(p)); 
        }
      });
    });
    callback(o); 
  });
}

exports.getcpu = function(callback) {
  read_proc_stat(callback);
};

exports.cpu_usage = function(callback) {
  read_proc_stat(function(o){
    cpu = o.cpu;
    total = 0;
    _.each(cpu, function(v){total += v});
    idle = cpu[3] + cpu[4]; //sum of idle + iowait
    callback(1 - (idle / total)); 
  });
};

function read_meminfo(callback) {
  fs.readFile('/proc/meminfo', function(err, data){
    if (err) throw err;
    lines = data.toString().split('\n');
    o = {};
    _.each(lines, function(l){
      pieces = l.split(' ');
      k = pieces.shift();
      k = k.split(':')[0];
      o[k] = {};
      foundAmount = false;
      _.each(pieces, function(p){
        if (p.length > 0) {
          if (!foundAmount) {
            foundAmount = true;
            o[k].amount = parseInt(p);
          }
          else {
            o[k].unit = p; 
          }
        }
      }); 
    });
    callback(o);
  });
}

exports.getmem = function(callback) {
  read_meminfo(callback);
};

exports.free_memory = function(callback) {
  read_meminfo(function(o){
    callback(o.MemFree.amount + o.Cached.amount);    
  });
};
