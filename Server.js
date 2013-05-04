var StatStream = require('./StatStream.js');
var Upstream = require('./Upstream.js');
var config = require('./Config.js');
var net  = require('net');
var _ = require('underscore');

var interval = 10000; //10 seconds
var port = 8001;

//TODO this needs to change based on role
//role = 'combiner' --> combining other stats
//role = 'leaf' --> as things are here
config.load('config.json', function(server_config, stats){
  var server = net.createServer(function(c){ 
    c.on('end', function(){
      console.log('disconnect');
    }); // end c.on('end'

    c.on('data', function(d){
      //TODO - add if for combiner versus leaf
      try {
        console.log(d.toString());
        j = JSON.parse(d);
        if (stats.hasOwnProperty(j.token)) {
          _.each(stats[j.token], function(stat){
            stat.stat.update(j.val); 
            console.log(j.token);
            console.log(stat.stat.val());
          });
        }
      }
      catch(e) {
        console.log(e);
        console.log(e.stack);
      }
    }); //end c.on('data'
  });

  server.listen(server_config.port, function(){
    console.log('server started');
  });
  
  Upstream.configure(server_config.upstream.type,
                     server_config.upstream.host,
                     server_config.upstream.port); 

  setInterval(function(){
    _.each(stats, function(stat_arr){
      _.each(stat_arr, function(stat){
        stat.elapsed -= 1000;
        if (stat.elapsed <= 0) {
          Upstream.push(stat);
          stat.elapsed = stat.interval;
          stat.stat.reset();
        }
      }); 
    });
  }, 1000);
}); //end config.load
