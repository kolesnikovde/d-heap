'use strict';

module.exports = function(heap) {
  var hl = heap.length, tmp, i;

  for (i = ~~(hl / 2); i >= 0; --i) {
    heapify(heap, i, hl);
  }

  for (i = hl - 1; i >= 0; --i) {
    tmp = heap[i];
    heap[i] = heap[0];
    heap[0] = tmp;
    heapify(heap, 0, i);
  }

  return heap;
};

function heapify(heap, pi, end) {
  var ci, tmp;

  while (true) {
    ci = 2 * pi + 1;

    if (heap[ci + 1] > heap[ci]) {
      ci += 1;
    }

    if (ci < end && heap[ci] > heap[pi]) {
      tmp = heap[pi];
      heap[pi] = heap[ci];
      heap[ci] = tmp;
      pi = ci;
    } else {
      break;
    }
  }

  return heap;
};
