var b          = require('b'),
    DHeap      = require('../'),
    bubblesort = require('./bubblesort'),
    heapsort   = require('./heapsort');

var rand = function(min, max) {
  return ~~(min + (Math.random() * (max - min + 1)));
}

var buildSample = function(n) {
  var arr = [];

  for (var i = 0; i < n; ++i) {
    arr.push(rand(0, n));
  }

  return arr;
}

var samples = [
  buildSample(10000),
  buildSample(1000000)
];

samples.forEach(function(sample) {
  // dup
  sample = sample.slice(0);

  b('native sort ' + sample.length).run(10, function() {
    sample.sort(function(a, b) { return a - b });
  });
});

samples.forEach(function(sample) {
  // dup
  sample = sample.slice(0);

  b('heapsort ' + sample.length).run(10, function() {
    heapsort(sample);
  });
});

samples.forEach(function(sample) {
  // Bad idea.
  if (sample.length > 10000) return;

  // dup
  sample = sample.slice(0);

  b('bubblesort ' + sample.length).run(10, function() {
    bubblesort(sample);
  });
});

[2, 3, 4, 8].forEach(function(arity) {
  samples.forEach(function(sample) {
    // dup
    sample = sample.slice(0);

    b(arity + '-ary heap sort ' + sample.length).run(10, function() {
      new DHeap(sample, { arity: arity }).sort();
    });
  });
});
