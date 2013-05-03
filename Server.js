var StatStream = require('./StatStream.js');
var config = require('./Config.js');
var net  = require('net');

var interval = 10000; //10 seconds
var port = 8001;

config.load('config.json', function(stats){
  var server = net.createServer(function(c){ 
    c.on('end', function(){
      console.log('disconnect');
    }); // end c.on('end'

    c.on('data', function(d){
      try {
        console.log(d.toString());
        j = JSON.parse(d);
        if (stats.hasOwnProperty(j.token)) {
          stats[j.token].stat.update(j.val);
          console.log(j.token);
          console.log(stats[j.token].stat.val());
        }
      }
      catch(e) {
        console.log(e);
        console.log(e.stack);
      }
    }); //end c.on('data'
  });

  server.listen(port, function(){
    console.log('server started');
  });
}); //end config.load

