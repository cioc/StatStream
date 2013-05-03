var _ = require('underscore');
var StatStream = require('./StatStream.js');

exports.testStats = function(test) {
  test.expect(4);
  a = [1,2,3,4,5,0,6,7,8,9,10];
  s = new StatStream.StatStream('min'); 
  _.each(a, function(v){
    s.update(v);
  });
  test.equal(0, s.val());
  s.reset();
  s.type = 'max';
  _.each(a, function(v){
    s.update(v);
  });
  test.equal(10, s.val());
  s.type = 'count';
  s.reset();
  _.each(a, function(v){
    s.update(v);
  });
  test.equal(a.length, s.val());
  s.type = 'avg';
  s.reset();
  avg = 0.0;
  _.each(a, function(v){
    avg += v;
  })
  avg /= a.length;
   _.each(a, function(v){
    s.update(v);
  });
  test.equal(avg, s.val());
  test.done();
};
