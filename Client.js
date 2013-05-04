var fs = require('fs');
var Usage = require('./Usage.js');
var net = require('net');

fs.readFile('client.json', function(err,data){
  config = JSON.parse(data);
  setInterval(function(){
    Usage.free_memory(function(free_mem){
      Usage.cpu_usage(function(cpu_usage){
        console.log("sending...");
        var client1 = net.connect({host: config.host, port: config.port}, function(){
          client1.write(JSON.stringify({token: 'cpu', val: cpu_usage}));
          client1.end();
        });
        var client2 = net.connect({host: config.host, port: config.port}, function(){
          client2.write(JSON.stringify({token: 'mem', val: free_mem}));
          client2.end();
        });
      });
    }); 
  }, 5000);
});
