var assert = require('assert');
var DHeap = require('./');

describe('d-heap', function() {
  function build(options) {
    var sample = [2, 5, 6, 9, 14, 1, 3, 4, 7, 8, 15, 13, 10, 11, 12, 16];

    return new DHeap(sample, options);
  }

  it('heapify', function() {
    var heap = build();

    assert.deepEqual(heap.items, [16, 7, 15, 12, 14, 1, 3, 4, 5, 8, 6, 13, 10, 11, 2, 9]);
  });

  it('allows custom arity', function() {
    var heap = build({ arity: 2 });

    assert.deepEqual(heap.items, [16, 15, 13, 9, 14, 10, 12, 5, 7, 8, 2, 1, 6, 11, 3, 4]);
  });

  it('allows custom comparator', function() {
    // Min-heap.
    var heap = build({ compare: function(a, b) { return b - a }});
    heap.sort();

    assert.deepEqual(heap.items, [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });

  it('#sort', function() {
    var heap = build();
    heap.sort();

    assert.deepEqual(heap.items, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
  });

  it('#update', function() {
    var heap = build();
    heap.update(3, 17);
    heap.sort();

    assert.deepEqual(heap.items, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17]);
  });

  it('#insert', function() {
    var heap = build();
    heap.insert(17);
    heap.sort();

    assert.equal(heap.items.pop(), 17);
  });

  it('#peek', function() {
    var heap = build();

    assert.equal(heap.peek(), 16);
    assert.equal(heap.items.length, 16);
  });

  it('#pop', function() {
    var heap = build();

    assert.equal(heap.pop(), 16);
    assert.equal(heap.items.length, 15);
  });
});
