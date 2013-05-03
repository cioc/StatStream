var StatStream = require('./StatStream.js');
var config = require('./Config.js');
var net  = require('net');
var _ = require('underscore');

var interval = 10000; //10 seconds
var port = 8001;

config.load('config.json', function(server_config, stats){
  var server = net.createServer(function(c){ 
    c.on('end', function(){
      console.log('disconnect');
    }); // end c.on('end'

    c.on('data', function(d){
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
}); //end config.load

