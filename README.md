# d-heap

[D-ary heap](https://en.wikipedia.org/wiki/D-ary_heap) implementation.

### Usage

```js
var DHeap = require('d-heap');

var sample = [2, 5, 6, 9, 14, 1, 3, 4, 7, 8, 15, 13, 10, 11, 12, 16];

// 4-ary max-heap
var heap = new DHeap(sample);
console.log(heap.items);
// [16, 7, 15, 12, 14, 1, 3, 4, 5, 8, 6, 13, 10, 11, 2, 9]

// Custom arity
var binHeap = new DHeap(sample, { arity: 2 });
console.log(binHeap.items);
// [16, 14, 15, 12, 8, 13, 11, 9, 5, 7, 6, 1, 10, 3, 2, 4]

// Custom comparator and sorting
var minHeap = new DHeap(sample, { compare: function(a, b) { return b - a }});
minHeap.sort();
console.log(heap.items);
// [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

### API

```js
sort()                 // Performs heapsort.
update(position, item) // Updates item at given position.
insert(item)           // Appends item and rebuild heap.
peek()                 // Returns top-most item.
pop()                  // Extracts top-most item from heap.
```

### License

MIT
