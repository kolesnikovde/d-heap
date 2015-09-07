'use strict';

module.exports = DHeap;

function defaultComparator(a, b) {
  return a - b;
}

function DHeap(items, options) {
  options || (options = {});

  this.items = items || [];
  this.compare = options.compare || defaultComparator;
  this.arity = options.arity || 4;
  this.rebuild();
}

var proto = DHeap.prototype;

proto.heapify = function(start, end) {
  if (end === 0) return;

  var heap = this.items,
      cmp = this.compare,
      arity = this.arity;

  start || (start = 0);
  end   || (end = heap.length - 1);

  while (true) {
    var idx = start;
    var offset = arity * idx;

    for (var i = offset + 1, l = offset + arity; i <= l; ++i) {
      if (i <= end && cmp(heap[i], heap[idx]) > 0) {
        idx = i;
      }
    }

    if (idx === start) {
      return;
    }

    var tmp = heap[start];
    heap[start] = heap[idx];
    heap[idx] = tmp;
    start = idx;
  }
};

proto.rebuild = function() {
  for (var i = ~~(this.items.length / this.arity); i >= 0; --i) {
    this.heapify(i);
  }
};

proto.sort = function() {
  var heap = this.items,
      start = heap.length - 1;

  if (start > 0) {
    for (var i = start; i >= 0; --i) {
      var tmp = heap[i];
      heap[i] = heap[0];
      heap[0] = tmp;
      this.heapify(0, --start);
    }
  }

  return heap;
};

proto.update = function(i, item) {
  var heap = this.items,
      cmp = this.compare,
      arity = this.arity,
      prev = heap[i];

  heap[i] = item;

  if (cmp(prev, item) > 0) {
    this.heapify(i);
  } else {
    while (i && cmp(heap[i], heap[parent = ~~(i / arity)]) > 0) {
      var tmp = heap[parent];
      heap[parent] = heap[i];
      heap[i] = tmp;
      i = parent;
    }
  }

  return item;
};

proto.insert = function(item) {
  return this.update(this.items.length, item);
};

proto.peek = function() {
  return this.items[0];
};

proto.pop = function() {
  var heap = this.items;

  if (heap.length < 2) {
    return heap.pop();
  } else {
    var root = heap[0];
    heap[0] = heap.pop();
    this.heapify();
    return root;
  }
};
