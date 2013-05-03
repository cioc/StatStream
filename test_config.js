var config = require('./Config.js');

config.load('config.json', function(dict){
  console.log(dict);
});
