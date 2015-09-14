'use strict';

module.exports = function(list) {
  var i = list.length - 1,
      j, swap, tmp;

  while (i > 0) {
    swap = 0;

    for (j = 0; j <= i; ++j) {
      if (list[j] > list[j + 1]) {
        tmp = list[j + 1];
        list[j + 1] = list[j];
        list[j] = tmp;
        swap = j;
      }
    }

    i = swap;
  }

  return list;
};
