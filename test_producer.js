var producer = require('./Producer.js');
var _ = require('underscore');
var sleep = require('sleep');

exports.testProducer = function(test) {
  producer.configure('localhost', 8001);
  producer.array([{token: 'hamburger', val: 1},{token: 'hamburger', val: 2},{token: 'hamburger', val: 3},{token: 'hamburger', val: 4}], 1000);
  sleep.sleep(10);
  producer.array([{token: 'hotdog', val: 1},{token: 'hotdog', val: 2},{token: 'hotdog', val: 3},{token: 'hotdog', val: 4}], 1000);
  test.done(); 
};
