var StatStream = require('./StatStream.js');
var net  = require('net');

var interval = 10000; //10 seconds
var port = 8001;

var server = net.createServer(function(c){
  c.on('end', function(){
    console.log('disconnect');
  });
  c.on('data', function(d){
    console.log(d.toString());
  });
});
server.listen(port, function(){
  console.log('server started');
})
