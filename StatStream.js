/* Type can be avg, min, max, count */
function reset(s) {
  if (s.type == 'min' || s.type == 'max') {
    s.extremum = null;
  }
  if (s.type == 'count' || s.type == 'avg') {
    s.count = 0;
  }
  if (s.type == 'avg') {
    s.avg = 0.0;
  }
}

function update_min(s, val) {
  if (s.extremum == null) {
    s.extremum = val;
  }
  else {
    if (val < s.extremum) {
      s.extremum = val;
    }
  }
}

function update_max(s, val) {
  if (s.extremum == null) {
    s.extremum = val;
  }
  else {
    if (val > s.extremum) {
      s.extremum = val;
    }
  }
}

function update_count(s) {
  s.count += 1; 
}

function update_avg(s, val) {
  s.count += 1;
  coef = (s.count - 1) / (s.count);
  s.avg = (coef * s.avg) + (val / s.count)
}

function StatStream(type) {
  this.type = type;
  reset(this);
}

StatStream.prototype = {
  reset: function() {
    var self = this;
    reset(self);
  }, //end reset
  update: function(val) {
    var self = this; 
    if (self.type == 'min') {
      update_min(self, val);
    }
    if (self.type == 'max') {
      update_max(self, val);
    }
    if (self.type == 'count') {
      update_count(self);
    }
    if (self.type == 'avg') {
      update_avg(self, val);
    }
  }, //end update
  val: function() {
    var self = this;
    if (self.type == 'min' || self.type == 'max') {
      return self.extremum;
    }
    if (self.type == 'count') {
      return self.count;
    }
    if (self.type == 'avg') {
      return self.avg;
    }
  } //end val
}

module.exports.StatStream = StatStream;
