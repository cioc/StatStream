var producer = require('./Producer.js');
var _ = require('underscore');

exports.testProducer = function(test) {
  producer.configure('hamburger', 'localhost', 8001);
  producer.array([1,2,3,4], 1000);
  test.done(); 
};
